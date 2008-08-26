@REM   ,------------------------------------.
@REM   | Clansuite Toolbar Build-Script w32 |
@REM   | by Jens-Andre Koch (jakoch@web.de) |
@REM   | for clansuite.com                  |
@REM   | LICENCE: BSD                    <3 |
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
@REM * all files/dirs
%pathto7zip% a -tzip -r -mx=9 clansuite_toolbar.xpi -x!.svn -x!*.bat -x!*.sh -x!update.rdf *

pause