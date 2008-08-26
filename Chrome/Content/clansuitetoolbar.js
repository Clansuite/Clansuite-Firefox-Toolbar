/**
 * Clansuite_LoadURL() function loads the specified URL in the browser.
 */
function Clansuite_LoadURL(URL)
{
    var parentWindow = null;

    // if window is a child, open tab in the parent
    if(window.opener)
    {
        parentWindow = window.opener;
    }
    else
    {
        parentWindow = window;
    }

    // If the open in tab preference is set to true
    if(ClansuiteGetPreferences("ClansuiteOpenTabs"))
    {
        // If the open tabs in background preference is set to true
        if(ClansuiteGetPreferences("ClansuiteOpenTabsBackground"))
        {
            parentWindow.getBrowser().loadOneTab(URL, null, null, null, true, false);
        }
        else
        {
            parentWindow.getBrowser().selectedTab = getBrowser().addTab(URL);
        }
    }
    else
    {
        //getBrowser().webNavigation.loadURI(URL);
        parentWindow.content.document.location = URL;
        parentWindow.content.focus();
    }
}

function Clansuite_LoadURL_type(type)
{
    switch (type)
    {
        case "ClansuiteWebserverWorkingDir":
            var URL = [ClansuiteGetPreferences("ClansuiteWebserverWorkingDir")];
            break;

        case "ClansuiteWebserverClansuiteDir":
            var URL = [ClansuiteGetPreferences("ClansuiteWebserverClansuiteDir")];
            break;
    }
  Clansuite_LoadURL(URL);
}

/**
 * Opens a toolbar button automatically if another toolbar button is open on the toolbar
 * Credits for this function go to Chris Pedrick and his webdevtoolbar.
 */
function Clansuite_openToolbarButton(currentToolbarButton)
{
    // If the toolbar button is set and is not open
    if(currentToolbarButton && !currentToolbarButton.open)
    {
        var toolbarButton        = null;
        var toolbarButtons       = currentToolbarButton.parentNode.getElementsByTagName("toolbarbutton");
        var toolbarButtonsLength = toolbarButtons.length;

        // Loop through the toolbar buttons
        for(var i = 0; i < toolbarButtonsLength; i++)
        {
            toolbarButton = toolbarButtons.item(i);

            // If the toolbar button is set, is not the same toolbar button and is open
            if(toolbarButton && toolbarButton != currentToolbarButton && toolbarButton.open)
            {
                toolbarButton.open        = false;
                currentToolbarButton.open = true;

                break;
            }
        }
    }
}

/**
 * Clansuite_OpenFile
 * todo = remove the type-switch, replace with OpenWithNotepad(filename) !!!
 */
function Clansuite_OpenWithNotepad(type)
{
    //// create an nsILocalFile for the executable
    var path = "c:\\windows\\notepad.exe";
    var file = Components.classes["@mozilla.org/file/local;1"]
             .createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath(path);

    var process = Components.classes["@mozilla.org/process/util;1"]
                        .createInstance(Components.interfaces.nsIProcess);
    process.init(file);

    switch (type)
    {
        case "errorlog":
            var args = [ClansuiteGetPreferences("ClansuiteApacheErrorLogFileName")];
            break;

        case "accesslog":
            var args = [ClansuiteGetPreferences("ClansuiteApacheAccessLogFileName")];
            break;
    }

    // Run the process.
    // If first param is true, calling thread will be blocked until
    // called process terminates.
    // Second and third params are used to pass command-line arguments
    // to the process.
    process.run(false, args, args.length);
}

/**
 * Clansuite_Search
 */
function Clansuite_Search(event, type)
{
    // Create a few variables
    var URL = "";
    var isEmpty = false;

    // Get a handle to our search terms box
    var searchTermsBox = document.getElementById("Clansuite-TB-SearchTerms");

    // Get the value in the search terms box, trimming whitespace as necessary
    var searchTerms = Clansuite_TrimString(searchTermsBox.value);

    // If there are no search terms, than we set isEmpty to true
    // Otherwise, we convert the search terms to a safe URI version
    if(searchTerms.length == 0) { isEmpty = true; }
    else { searchTerms = Clansuite_ConvertTermsToURI(searchTerms); }

    // Do something different for differing search types
    switch(type)
    {
            // Build up the URL for a clansuite_forum search
        case "clansuite_forum":
            if(isEmpty) { URL = "http://forum.clansuite.com/index.php?action=search2"; }
            else        { URL = "http://forum.clansuite.com/index.php?action=search2&search=" + searchTerms; }
            break;

            // Build up the URL for a clansuite_bugtracker search
        case "clansuite_bugtracker":
            if(isEmpty) { URL = "http://trac.clansuite.com/"; }
            else        { URL = "http://trac.clansuite.com/search?noquickjump=1&ticket=on&changeset=on&wiki=on&q=" + searchTerms; }
            break;

            // Build up the URL for a clansuite_dokuwiki search
        case "clansuite_dokuwiki":
            if(isEmpty) { URL = "http://wiki.clansuite.com/"; }
            else        { URL = "http://wiki.clansuite.com/?do=search&id=" + searchTerms; }
            break;

            // Build up the URL for a clansuite_phpdoc search
        case "clansuite_phpdoc":
            if(isEmpty) { URL = "http://docs.clansuite.com/index.php"; }
            else        { URL = "http://docs.clansuite.com/index.php?search=" + searchTerms; }
            break;

            // Build up the URL for a smarty forum search
        case "smarty_forum":
            if(isEmpty) { URL = "http://www.phpinsider.com/smarty-forum/"; }
            else        { URL = "http://www.phpinsider.com/smarty-forum/search.php?search_keywords=" + searchTerms; }
            break;

            // Build up the URL for a smarty documentation search
        case "smarty_docs":
            if(isEmpty) { URL = "http://www.smarty.net/docs.php"; }
            else        { URL = "http://www.smarty.net/" + searchTerms; }
            break;

            // Build up the URL for a php manual search
        case "php_manual":
            if(isEmpty) { URL = "http://de.php.net/"; }
            else        { URL = "http://de.php.net/" + searchTerms; }
            break;

            // Build up the URL for a php standard library search
        case "php_spl_manual":
            if(isEmpty) { URL = "http://www.php.net/~helly/php/ext/spl/"; }
            //else        { URL = "http://de.php.net/manual/de/book.spl.php" + searchTerms; }
            else        { URL = "http://de.php.net/manual/de/book.spl.php"; }
            break;

            // Build up the URL for a selfhtml search
        case "selfhtml_search":
            if(isEmpty) { URL = "http://de.selfhtml.org/"; }
            else        { URL = "http://de.selfhtml.org/navigation/suche/index.htm?Suchanfrage=" + searchTerms; }
            break;

            // Build up the URL for a selfhtml css search
        case "selfhtml_css_search":
            if(isEmpty) { URL = "http://de.selfhtml.org/css/"; }
            else        { URL = "http://de.selfhtml.org/navigation/suche/index.htm?Suchanfrage=" + searchTerms; }
            break;

            // Build up the URL for a google search
        case "google":
            if(isEmpty) { URL = "http://www.google.com/"; }
            else        { URL = "http://www.google.com/search?q=" + searchTerms; }
            break;

            // Build up the URL for a yahoo search
        case "yahoo":
            if(isEmpty) { URL = "http://www.yahoo.com/"; }
            else        { URL = "http://search.yahoo.com/search?p=" + searchTerms; }
            break;

            // Build up the URL for a wikipedia search
        case "wikipedia":
            if(isEmpty) { URL = "http://de.wikipedia.org/"; }
            else        { URL = "http://de.wikipedia.org/wiki/search?p=" + searchTerms; }
            break;

            // Build up the URL for a google code search
        case "google_code":
            if(isEmpty) { URL = "http://www.google.com/codesearch"; }
            else        { URL = "http://www.google.com/codesearch?q=" + searchTerms + " lang:php"; }
            break;

            // Build up the URL for a koders code search
        case "koders_code":
            if(isEmpty) { URL = "http://www.koders.com/default.aspx?s=&btn=&la=PHP&li=*"; }
            else        { URL = "http://www.koders.com/default.aspx?btn=&la=PHP&li=*&s=" + searchTerms; }
            break;

            // Build up the URL for a krugle code search
        case "krugle_code":
            if(isEmpty) { URL = "http://www.krugle.com/kse/"; }
            else        { URL = "http://www.krugle.com/kse/files?lang=php&query=" + searchTerms; }
            break;

        default:
            if(isEmpty) { URL = "http://www.clansuite.com/"; }
            else        { URL = "http://www.google.com/search?q=" + searchTerms; }
            break;
    }

    // Load the URL in the browser window using the RPT_LoadURL function
    Clansuite_LoadURL(URL);
}

/**
 * Trims Whitespaces on a String
 */
function Clansuite_TrimString(string)
{
    // Return empty if nothing was passed in
    if (!string) return "";

    // Efficiently replace any leading or trailing whitespace
    var value = string.replace(/^\s+/, '');
    value = string.replace(/\s+$/, '');

    // Replace any multiple whitespace characters with a single space
    value = value.replace(/\s+/g, ' ');

    // Return the altered string
    return value;
}

/**
 * Converts "Word Word" to "Word+Word" for URI Addon to the Search Engines
 */
function Clansuite_ConvertTermsToURI(terms)
{
    // Split up the search terms based on the space character
    var termArray = new Array();
    termArray = terms.split(" ");
    var result = "";

    // Loop through the search terms, building up the result string
    for(var i=0; i<termArray.length; i++)
    {
        if(i > 0) { result += "+"; }

        // Call the built-in function encodeURIComponent() to clean up
        // this search term (making it safe for use in a URL)
        result += encodeURIComponent(termArray[i]);
    }

    // Return the result
    return result;
}

function Clansuite_Populate()
{
    // Get the menu element that we will be working with
    var menu = document.getElementById("Clansuite-TB-Combined-Search");

    // Clean up whatever is currently in the menu
    for(var i=menu.childNodes.length - 1; i>=0; i--) {
        menu.removeChild(menu.childNodes.item(i));
    }

    // This string contains 5 "search terms", each separated by two pipes (||)
    var terms = "";

    // Create an array based on the terms in the string above
    var termArray = new Array();
    termArray = terms.split("||");

    // Load the search terms into our menu
    for(var i=0; i<termArray.length; i++)
    {
        // For each search term, create a menu item element
        var tempItem = null;
        tempItem = document.createElement("menuitem");

        // Set the menuitem element's various attributes:
        // The label will be the search term itself
        // The tooltip will be the text "Dynamic Item #", where # is the number of the item

        tempItem.setAttribute("label", termArray[i]);
        tempItem.setAttribute("tooltiptext", "Dynamic Item " + (i+1));

        // Add the item to our menu
        menu.appendChild(tempItem);
    }
}

function Clansuite_Popup(url)
{
// window.onbeforeunload = null;
var winl = (screen.width / 2) - 400;
prop = 'height=400,width=400,top=100,left='+winl+',scrollbars=no,resizable=yes,toolbar=no,location=no,status=no'
Window = window.open(url,'ClansuiteAbout',prop);
Window.focus();
}

// Show/Hide Elements
function ClansuiteDefaultPreferences(pref)
{
    preferences = [];

    <!-- Show Toolbar Elements -->
    preferences['ClansuiteShowSearch']              = true;
    preferences['ClansuiteShowDocumentationMenu']   = true;
    preferences['ClansuiteShowDeveloperMenu']       = false;
    preferences['ClansuiteShowBugtrackerMenu']      = false;
    preferences['ClansuiteShowWebserverMenu']       = false;

    <!-- Show in Tabs or Windows -->
    preferences['ClansuiteOpenTabs']                = true;
    preferences['ClansuiteOpenTabsBackground']      = true;

    <!-- Paths to Apache Webserver -->
    preferences['ClansuiteWebserverWorkingDir']     = "http://localhost/work/";
	preferences['ClansuiteWebserverClansuiteDir']   = "http://localhost/work/clansuite/";
	preferences['ClansuiteApacheErrorLogFileName']  = "c:\\xampp\\apache\\logs\\www.clansuite-dev.com-error.log";
	preferences['ClansuiteApacheAccessLogFileName'] = "c:\\xampp\\apache\\logs\\www.clansuite-dev.com-access.log";

    return preferences[pref];
}

function ClansuiteGetPreferences(pref)
{
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].
            getService(Components.interfaces.nsIPrefService);
    prefs = prefs.getBranch("extensions.clansuitetoolbar.");

    var retValue;
    if(prefs.prefHasUserValue(pref))
    {
//      alert('the user has set this one');
        if (prefs.getPrefType(pref) == prefs.PREF_BOOL)
            retValue = prefs.getBoolPref(pref);
        else if (prefs.getPrefType(pref) == prefs.PREF_INT)
            retValue = prefs.getIntPref(pref);
        else if (prefs.getPrefType(pref) == prefs.PREF_STRING)
            retValue = prefs.getCharPref(pref);
    }
    else
    {
        retValue = ClansuiteDefaultPreferences(pref);
    }
    return retValue
}

var myPrefObserver =
{
    register: function()
    {
        var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService);
        this._branch = prefService.getBranch("extensions.clansuitetoolbar.");
        this._branch.QueryInterface(Components.interfaces.nsIPrefBranch2);
        this._branch.addObserver("", this, false);
    },

    unregister: function()
    {
        if(!this._branch)
            return;
        this._branch.removeObserver("", this);
    },

    observe: function(aSubject, aTopic, aData)
    {
        if(aTopic != "nsPref:changed")
            return;
        // aSubject is the nsIPrefBranch we're observing (after appropriate QI)
        // aData is the name of the pref that's been changed (relative to aSubject)
        switch (aData)
        {
            case "ClansuiteShowSearch":
                toggleSearch();
                break;
            case "ClansuiteShowDocumentationMenu":
                toggleDocumentationMenu();
                break;
            case "ClansuiteShowDeveloperMenu":
                toggleDeveloperMenu();
                break;
            case "ClansuiteShowBugtrackerMenu":
                toggleBugtrackerMenu();
                break;
            case "ClansuiteShowWebserverMenu":
                toggleWebserverMenu();
                break;
            /**
            case "ClansuiteOpenTabs":
                toggleTabOptionStatus();
                break;

            case "ClansuiteOpenTabsBackground":
                break;
                **/
        }
    }
}
myPrefObserver.register();

function loadUserSettings()
{
    toggleSearch();
    toggleDocumentationMenu();
    toggleDeveloperMenu();
    toggleBugtrackerMenu();
    toggleWebserverMenu();
}

/**
 * toggle the display of a certain Element, if config(pref) says so
 */
function toggleDisplay(pref, elID)
{
    if (!ClansuiteGetPreferences(pref))
    {
        // hiding element
        document.getElementById(elID).style.display='none';
    }
    else
    {
        // displaying element
        document.getElementById(elID).style.display=null;
    }
}

/**
 * Combined Toggle for Search Menu
 */
function toggleSearch()
{
    // alert('toggling the search');

    // toggle "Search:"-Element
    toggleDisplay('ClansuiteShowSearch', 'Clansuite-TB-Search-LabelItem');
    // toggle "SearchTerms"-Element
    toggleDisplay('ClansuiteShowSearch', 'Clansuite-TB-SearchTerms-TBItem');
    // toggle "Combined-Search"-Element
    toggleDisplay('ClansuiteShowSearch', 'Clansuite-TB-Combined-Search');
    // toggle "Resizer"-Element
    toggleDisplay('ClansuiteShowSearch', 'Clansuite-TB-ResizeSplitter');
}

/**
 * Combined Toggle for Documentation
 */
function toggleDocumentationMenu()
{
    toggleDisplay('ClansuiteShowDocumentationMenu', 'Clansuite-TB-DocumentationMenu');
}

/**
 * Combined Toggle for DevelopersMenu
 */
function toggleDeveloperMenu()
{
    toggleDisplay('ClansuiteShowDeveloperMenu', 'Clansuite-TB-DeveloperMenu');
}

/**
 * Combined Toggle for BugTrackerMenu
 */
function toggleBugtrackerMenu()
{
    toggleDisplay('ClansuiteShowBugtrackerMenu', 'Clansuite-TB-BugtrackerMenu');
}

/**
 * Combined Toggle for WebserverMenu
 */
function toggleWebserverMenu()
{
    toggleDisplay('ClansuiteShowWebserverMenu', 'Clansuite-TB-WebserverMenu');
}


// Show Hide End

// Start RSS Reader

// End RSS Reader