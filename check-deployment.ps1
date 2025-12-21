#!/usr/bin/env pwsh
# Pre-Deployment Checker Script
# यह script deployment से पहले सब कुछ check करेगा

Write-Host "`n🔍 Pre-Deployment Checker Starting...`n" -ForegroundColor Cyan

$errors = @()
$warnings = @()

# Check 1: Git Installed
Write-Host "✓ Checking Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "  ✓ Git installed: $gitVersion" -ForegroundColor Green
} catch {
    $errors += "Git not installed"
    Write-Host "  ✗ Git not found! Install from: https://git-scm.com/" -ForegroundColor Red
}

# Check 2: Node.js Installed
Write-Host "✓ Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    $errors += "Node.js not installed"
    Write-Host "  ✗ Node.js not found! Install from: https://nodejs.org/" -ForegroundColor Red
}

# Check 3: Backend Dependencies
Write-Host "✓ Checking Backend Dependencies..." -ForegroundColor Yellow
if (Test-Path "backend\package.json") {
    if (Test-Path "backend\node_modules") {
        Write-Host "  ✓ Backend dependencies installed" -ForegroundColor Green
    } else {
        $warnings += "Backend dependencies not installed"
        Write-Host "  ⚠ Backend dependencies not installed. Run: cd backend && npm install" -ForegroundColor Yellow
    }
} else {
    $errors += "Backend package.json not found"
    Write-Host "  ✗ Backend package.json not found!" -ForegroundColor Red
}

# Check 4: Frontend Dependencies
Write-Host "✓ Checking Frontend Dependencies..." -ForegroundColor Yellow
if (Test-Path "front-end\package.json") {
    if (Test-Path "front-end\node_modules") {
        Write-Host "  ✓ Frontend dependencies installed" -ForegroundColor Green
    } else {
        $warnings += "Frontend dependencies not installed"
        Write-Host "  ⚠ Frontend dependencies not installed. Run: cd front-end && npm install" -ForegroundColor Yellow
    }
} else {
    $errors += "Frontend package.json not found"
    Write-Host "  ✗ Frontend package.json not found!" -ForegroundColor Red
}

# Check 5: Environment Files
Write-Host "✓ Checking Environment Files..." -ForegroundColor Yellow
if (Test-Path "backend\.env.example") {
    Write-Host "  ✓ Backend .env.example exists" -ForegroundColor Green
} else {
    $warnings += "Backend .env.example missing"
    Write-Host "  ⚠ Backend .env.example missing" -ForegroundColor Yellow
}

if (Test-Path "front-end\.env.example") {
    Write-Host "  ✓ Frontend .env.example exists" -ForegroundColor Green
} else {
    $warnings += "Frontend .env.example missing"
    Write-Host "  ⚠ Frontend .env.example missing" -ForegroundColor Yellow
}

# Check 6: Git Repository
Write-Host "✓ Checking Git Repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "  ✓ Git repository initialized" -ForegroundColor Green
    
    try {
        $remote = git remote get-url origin 2>$null
        if ($remote) {
            Write-Host "  ✓ Remote origin set: $remote" -ForegroundColor Green
        } else {
            $warnings += "Git remote not set"
            Write-Host "  ⚠ Git remote not set. You'll need to add it later." -ForegroundColor Yellow
        }
    } catch {
        $warnings += "Git remote not configured"
        Write-Host "  ⚠ Git remote not configured" -ForegroundColor Yellow
    }
} else {
    $warnings += "Git not initialized"
    Write-Host "  ⚠ Git not initialized. Run: git init" -ForegroundColor Yellow
}

# Check 7: .gitignore
Write-Host "✓ Checking .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    Write-Host "  ✓ .gitignore exists" -ForegroundColor Green
} else {
    $warnings += ".gitignore missing"
    Write-Host "  ⚠ .gitignore missing - .env files might be committed!" -ForegroundColor Yellow
}

# Check 8: Config File
Write-Host "✓ Checking Frontend Config..." -ForegroundColor Yellow
if (Test-Path "front-end\src\config.js") {
    Write-Host "  ✓ Config.js exists" -ForegroundColor Green
} else {
    $errors += "Config.js missing"
    Write-Host "  ✗ front-end\src\config.js missing!" -ForegroundColor Red
}

# Check 9: Required Files
Write-Host "✓ Checking Required Files..." -ForegroundColor Yellow
$requiredFiles = @(
    "backend\server.js",
    "backend\config\db.js",
    "front-end\src\App.jsx",
    "front-end\src\main.jsx",
    "front-end\vite.config.js"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        $errors += "$file missing"
        Write-Host "  ✗ $file missing!" -ForegroundColor Red
    }
}

# Summary
Write-Host "`n" -NoNewline
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "                    SUMMARY" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan

if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "`n✅ ALL CHECKS PASSED! आप deploy करने के लिए ready हैं! 🎉`n" -ForegroundColor Green
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "1. देखें: QUICK_DEPLOY.md" -ForegroundColor White
    Write-Host "2. GitHub पर code push करें" -ForegroundColor White
    Write-Host "3. Render.com पर backend deploy करें" -ForegroundColor White
    Write-Host "4. Vercel पर frontend deploy करें" -ForegroundColor White
} else {
    if ($errors.Count -gt 0) {
        Write-Host "`n❌ ERRORS FOUND ($($errors.Count)):" -ForegroundColor Red
        foreach ($error in $errors) {
            Write-Host "  • $error" -ForegroundColor Red
        }
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "`n⚠️  WARNINGS ($($warnings.Count)):" -ForegroundColor Yellow
        foreach ($warning in $warnings) {
            Write-Host "  • $warning" -ForegroundColor Yellow
        }
    }
    
    Write-Host "`nPlease fix the errors before deploying.`n" -ForegroundColor Red
}

Write-Host "═══════════════════════════════════════════════════════`n" -ForegroundColor Cyan
