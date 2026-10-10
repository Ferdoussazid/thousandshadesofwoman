Add-Type -AssemblyName System.Drawing

function New-PngIcon {
    param(
        [int]$size,
        [string]$outPath
    )
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    # Background rounded rect (squircle)
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#FFE9E6"))
    $radius = [float]($size * 0.22)
    $d = $radius * 2
    $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $gp.AddArc(0, 0, $d, $d, 180, 90)
    $gp.AddArc($size - $d, 0, $d, $d, 270, 90)
    $gp.AddArc($size - $d, $size - $d, $d, $d, 0, 90)
    $gp.AddArc(0, $size - $d, $d, $d, 90, 90)
    $gp.CloseFigure()
    $g.FillPath($bgBrush, $gp)

    # Brand triangle
    # Coordinates normalized: base width = 20.421, height = 17.686
    $tWidth = [float]($size * 0.56)
    $tHeight = [float]($tWidth * (17.686 / 20.421))
    $centerX = [float]($size / 2.0)
    $centerY = [float]($size / 2.0 + ($size * 0.025))

    $pTop = New-Object System.Drawing.PointF($centerX, ($centerY - $tHeight / 2.0))
    $pLeft = New-Object System.Drawing.PointF(($centerX - $tWidth / 2.0), ($centerY + $tHeight / 2.0))
    $pRight = New-Object System.Drawing.PointF(($centerX + $tWidth / 2.0), ($centerY + $tHeight / 2.0))

    $triPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $triPath.AddLine($pLeft, $pRight)
    $triPath.AddLine($pRight, $pTop)
    $triPath.CloseFigure()

    $c1 = [System.Drawing.ColorTranslator]::FromHtml("#FF5A20")
    $c2 = [System.Drawing.ColorTranslator]::FromHtml("#FFACC7")
    $fullRect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
    $gradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $fullRect, $c1, $c2, 25.0
    )
    $g.FillPath($gradBrush, $triPath)

    $parentDir = Split-Path $outPath -Parent
    if ($parentDir -and -not (Test-Path $parentDir)) {
        New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
    }

    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Created PNG: $outPath ($size x $size)"
}

function New-IcoFile {
    param(
        [int[]]$sizes,
        [string]$outPath
    )
    # Generate PNG byte arrays for each size
    $pngBytesList = @()
    foreach ($sz in $sizes) {
        $tempPath = [System.IO.Path]::GetTempFileName() + ".png"
        New-PngIcon -size $sz -outPath $tempPath
        $bytes = [System.IO.File]::ReadAllBytes($tempPath)
        Remove-Item $tempPath -Force
        $pngBytesList += ,@($sz, $bytes)
    }

    $ms = New-Object System.IO.MemoryStream
    $bw = New-Object System.IO.BinaryWriter($ms)

    # ICONHEADER: reserved (0), type (1 = icon), count
    $count = $pngBytesList.Count
    $bw.Write([uint16]0)
    $bw.Write([uint16]1)
    $bw.Write([uint16]$count)

    # Offset of image data starts after header (6 bytes) + directory entries (16 * count bytes)
    $offset = 6 + (16 * $count)

    foreach ($entry in $pngBytesList) {
        $sz = $entry[0]
        $bytes = $entry[1]
        $bWidth = if ($sz -ge 256) { [byte]0 } else { [byte]$sz }
        $bHeight = if ($sz -ge 256) { [byte]0 } else { [byte]$sz }

        $bw.Write($bWidth)
        $bw.Write($bHeight)
        $bw.Write([byte]0) # color count
        $bw.Write([byte]0) # reserved
        $bw.Write([uint16]1) # color planes
        $bw.Write([uint16]32) # bpp
        $bw.Write([uint32]$bytes.Length) # size of image data
        $bw.Write([uint32]$offset) # offset

        $offset += $bytes.Length
    }

    # Write image data
    foreach ($entry in $pngBytesList) {
        $bytes = $entry[1]
        $bw.Write($bytes, 0, $bytes.Length)
    }

    $bw.Flush()
    $parentDir = Split-Path $outPath -Parent
    if ($parentDir -and -not (Test-Path $parentDir)) {
        New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
    }
    [System.IO.File]::WriteAllBytes($outPath, $ms.ToArray())
    $bw.Close()
    $ms.Close()
    Write-Output "Created ICO: $outPath with sizes: $($sizes -join ', ')"
}

# Generate tab icons in app/ and public/
New-PngIcon -size 512 -outPath "app/icon.png"
New-PngIcon -size 180 -outPath "app/apple-icon.png"
New-IcoFile -sizes @(16, 32, 48) -outPath "app/favicon.ico"

# Mirror to public/
New-PngIcon -size 512 -outPath "public/icon.png"
New-PngIcon -size 180 -outPath "public/apple-icon.png"
Copy-Item "app/favicon.ico" "public/favicon.ico" -Force

Write-Output "Icon generation complete!"
