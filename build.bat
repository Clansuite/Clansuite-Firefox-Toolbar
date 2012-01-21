::   ,------------------------------------.
::   | Clansuite Toolbar Build-Script w32 |
::   | by Jens-André Koch (jakoch@web.de) |
::   | for clansuite.com                  |
::   | LICENCE: GNU/GPLv2 or any later <3 |
::   `------------------------------------'

:: 7zip is needed as packaging tool
:: Download CLI Version: http://downloads.sourceforge.net/sevenzip/7za920.zip
set "7zip=C:\Programme\7-Zip\7z.exe"

:: delete any prior version
del clansuite_toolbar*.xpi

:: 7zip command line options for packaging clansuite_toolbar.xpi
::
::  a               = archiv
::  tzip            = zip packaging
::  r               = recurse into subdirectories
::  mx              = compression level
::  archiv name 
::  -x!.svn         = exclude SVN dir
::  -x!*.bat        = exclude *.bat (the make file)
::  -x!*.sh         = exclude *.sh (the make file)
::  -x!*.xhtml      = exclude *.xhtml (the update description file for display in FF)
::  -x!*.xpi        = exclude *.xoi (old versions of the toolbar)
::  -x!update.xml   = exclude single file
::  -x!update.rdf   = exclude single file
::  *               = all files & folders
::
set "excludes=-x!.svn -x!*.bat -x!*.sh -x!*.xhtml -x!*.xpi -x!update.xml -x!update.rdf"
%7zip% a -tzip -r -mx=9 clansuite_toolbar-v.xpi %excludes% *

pause