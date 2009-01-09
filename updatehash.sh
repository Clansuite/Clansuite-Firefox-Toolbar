#!/bin/sh
#   ,------------------------------------.
#   | Clansuite Toolbar Build-Script     |
#   | by Jens-André Koch (jakoch@web.de) |
#   | for clansuite.com                  |
#   | LICENCE: GNU/GPLv2 or any later <3 |
#   `------------------------------------'
#
# Quick and dirty script to update the sha1 value
# of the update.rdf, after the toolbar was build.
# If you build the toolbar under w32 use HashTab
# for the generation of hashes.

# 1. get hashvalue of clansuite_toolbar.xpi

SHA_HASH=$(sha1sum clansuite_toolbar.xpi | awk '{ print $1}' ) 

# 2. replace old sha1 value in update.rdf with the new one

sed -e "s/<em:updateHash>sha1:*</em:updateHash>/$SHA_HASH/x" -i update.rdf