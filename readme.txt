                                _________________________
                                C  L  A  N  S  U  I  T  E


    ### Neue Version veröffentlichen

    Ausgangspunkt: Es wurde eine Änderung am Sourcecode vorgenommen.

    1.  Versionnummer in "install.rdf" und "/chrome/content/clansuite_about.xul" (Zeile 40 ff.) erhöhen
    2.  Mit McCoy das Kommando "Install" auf install.rdf ausführen
    3.  Builden mittels build.bat
    4.  clansuite-toolbar-v.xpi in clansuite-toolbar-v{Versionsnummer}.xpi umbenennen
    5.  sha1 Hash der clansuite-toolbar-v{Versionsnummer}.xpi ermitteln
    6.  sha1 Hash in die update.xml eintragen
    7.  update.xml in update.rdf umbenennen
    8.  Mit McCoy das Kommando "Sign" auf update.rdf ausführen
    9.  updateInfo-v{Versionsnummer}.xhtml (Achtung: ohne Punkt) mit aktuellen Infos zur Version füllen
    10. Veröffentlichung durch 
        a) Hochladen der Dateien
            update.rdf
            clansuite-toolbar-v{Versionnummer}.xpi
            updateInfo-v{Versionummer}.xhtml
        b) Absetzen einer Info über Clansuite Google News

    Hinweise:

    a) {Versionsnummer}     ist ein Platzhalter für die Versionsnummer im Format major.minor (z.B. "0.7").
    b) McCoy                https://developer.mozilla.org/en/McCoy
    c) HashCheck            http://code.kliu.org/hashcheck/downloads/HashCheckInstall-latest.exe

    ### Clansuite Developer Toolbar

    This is the official Clansuite Developer Toolbar for the Mozilla Firefox Webbrowser.

    ### Version History:

    v0.1 - 10.10.2007
    v0.2 - 08.05.2008
    v0.3 - 16.10.2008
    v0.4 - 21.01.2009
    v0.5 - /
    v0.6 - 22.06.2009
    v0.7 - /
    v0.8 - 05.02.2010

    ### Changelog:

    v0.8 - 05.02.2010 (Autor: Florian Wolf)
    - added working- & clansuite-dir jumptos
    - updated toolbar urls
    - updated icon teamspeak.png
    - updated trac urls
    - fixed middle mousebutton bugs
    - fixed tab-in-background bug
    - fixed default value bug
    - fixed webserver path problem with trailing slashes
    - minor cleanups

    22.06.2009
    - added link "Bugtracker" > "Your Tasks". providing a quick link to the trac tasks assigned to a logged in developer.
    - fixed the Firefox 3.* version compatibility issue

    21.01.2009
    - added autoupdate feature (v0.4)

    08.01.2009:
    - added link for pastebin

    25.12.2008:
    - added link for IRCLogs

    06.10.2008:
    - Änderungen: Es wurde aufgeräumt.
    * Ungenutzte Menüpunkte entfernt (zB Freunde einladen).
    * Einige Fehlbenennungen der Menüpunkt und Mouseovers, die durch Copy'n'Paste entstanden waren, wurden berichtigt.
    * Der Menüpunkt "httpd" wurde verändert: Die direkten Links auf das lokale Clansuite sind nun unter dem Menüpunkt "go to" erreichbar. Unter "httpd" verbleiben die Links für Datenbank und Webserververzeichnisse und -dienste.
    * "httpd": Umbenennung der Links "/localhost/work" => "Working Dir" und "/localhost/work/clansuite" => "Clansuite Dir". Beide sind relativ zu den eingestellten Pfaden unter "Options".
    * Menüpunkt "go to enthält nun auch den Link zum Converter. Zum Release-Zeitpunkt dieser Toolbar ist er jedoch noch nicht verfügbar.

    08.05.2008:
    - added SPL-Doc to Search
    - added Config Dialog to set Webserver-Path

    21.01.2008:
    - added new feature to options dialog:
      select if new pages should open in tab or window
      with suboption to open tabs in the background or directly focus them

    15.01.2008:
    - removed toolbaritem tags
    - added comments to menu entries
    - added openToolbarButton when mouseover

    10.01.2008:
    - added phpdoctrine website and manual links

    17.12.2007:
    - fixes for bugtracker links
    - added directory linkt to clansuite to httpd apache webserver menu
    - added selfhtml css link/search

    16.12.2007:
    - added direct link to clansuite on localhost
    - fixed links and naming of bugtracker menu links

    26.11.2007:
    - Path to 7zip fixed in the Buildscript

    09.11.2007:
    - Buildscript was added

    03.11.2007:
    - SelfHTML Search added

    01.11.2007 & 29.10.2007:
    - Codesearch for Google, Krugle, Koders added

    28.10.2007:
    - Initial SVN Commit

    10.10.2007:
    - Version 0.1 finished
    - First Release

    01.10.2007
    - Started Development of the Clansuite Toolbar