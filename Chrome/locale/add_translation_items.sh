#/bin/bash

# Loop over all directory

for f in *-*
do
  if [ "$f" = "en-US" ]; then
    echo "Skipping Default Locale - $f"
  else 
    echo "Modifing Locale:  $f"
    cat items_to_add.txt >> $f/toolbar.dtd
  fi
done