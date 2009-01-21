@REM   ,------------------------------------.
@REM   | Clansuite Toolbar Build-Script w32 |
@REM   | by Jens-André Koch (jakoch@web.de) |
@REM   | for clansuite.com                  |
@REM   | LICENCE: GNU/GPLv2 or any later <3 |
@REM   `------------------------------------'
@REM SVN: $Id: build.bat 2330 2008-08-01 15:40:13Z vain $

@REM 7zip is needed as packaging tool
set "pathto7zip=C:\Programme\7-Zip\7z.exe"
@REM  set "pathto7zip=C:\Programme\packer\7-Zip\7z.exe"

@REM Delete prior version
del clansuite_toolbar.xpi

@REM 7zip command line options for clansuite_toolbar.xpi
@REM a = archiv
@REM tzip = zip packaging
@REM r = recurse subdirs
@REM mx = compression lvl
@REM -x!.svn = exclude SVN dir
@REM -x!*.bat = exclude *.bat (the make file)
@REM -x!*.sh = exclude *.sh (the make file)
@REM -x!*.xhtml = exclude *.xhtml (the update description file for display in FF)
@REM * all files/dirs
set "excludes=-x!.svn -x!*.bat -x!*.sh -x!*.xhtml -x!*.xpi -x!update.xml -x!update.rdf"
%pathto7zip% a -tzip -r -mx=9 clansuite_toolbar-v.xpi %excludes% *

pause