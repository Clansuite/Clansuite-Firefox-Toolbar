#!/bin/bash
# Replace all eight-digit numbers with builddate in selected files
# The Original Code is InfoLister
# @link http://svn.doslash.org/asqueella/infolister/)
# @author Nickolay Ponomarev
# @license MPL 1.1/GPL 2.0/LGPL 2.1
UPDATE_LIST="./install.rdf"

echo "Updating build date..."
for UPDATE_FILE in $UPDATE_LIST; do
  if [ -f $UPDATE_FILE ]; then
    echo "   $UPDATE_FILE"
    # next line replaced dates like 20091210
    #sed -i -r s/\\.[0-9]{8}\</.`date "+%Y%m%d"`\</ $UPDATE_FILE
    # next line replaces dates like 10.12.2009
    sed -i -r s/\\.([0-9]{2}).([0-9]{2}).([0-9]{4})\</.`date "+%Y%m%d"`\</ $UPDATE_FILE
  fi
done
echo "Done!"