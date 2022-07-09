
## Bankatog
Bankatog is a solution for tracking all of my characters' stuff that's a bit more usable than Google Sheets.

### How It Works
Each character has a logout macro like
```
/sit
/outputfile inventory CharName_inventory.txt
/camp
```
A PowerShell script monitors the EQ directory for changes to any `*_inventory.txt` files. When it detects changes, it automatically commits the inventory files to the repo. It then pushes the changes to master and redeploys github pages.

### Notable Omissions
This currently only pulls items that are inside bags. Nothing equipped to a character or in top-level inventory is checked.
There is also no handling for (i.e. removal of) NO DROP items.

### Feedback
Please only open an issue for **bugs**. If you have suggestions or ideas, ping me on the Kittens Discord.
