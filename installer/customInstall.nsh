!macro customInit
    SetAutoClose false
    check_running:
    nsExec::ExecToStack 'cmd /c tasklist /fi "imagename eq VersePC.exe" | find "VersePC.exe"'
    Pop $R0
    Pop $R1
    StrCmp $R0 "0" 0 done_init
    MessageBox MB_YESNO "VersePC is running. Close and continue?" IDYES close_and_continue IDNO abort_install
    Goto done_init
    close_and_continue:
    nsExec::ExecToStack 'taskkill /im VersePC.exe /f'
    Sleep 2000
    Goto check_running
    abort_install:
    Abort
    done_init:
!macroend

!macro customInstallMode
    StrCpy $isForceInstall "1"
!macroend
