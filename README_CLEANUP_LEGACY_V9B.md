# Cleanup legacy V9B

Fixed version of V9 cleanup patch.

Reason:
PowerShell on Windows parsed the previous .ps1 incorrectly because of non-ASCII characters in a Write-Host line.

This version uses ASCII-only PowerShell script.

It removes old demo components that conflict with the current production Project model.
