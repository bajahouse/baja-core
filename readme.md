## NOTICE
This repository is now updated to the strings-rewrite branch. These modules are no longer setup to work with 0.14 and earlier versions of TSWOW.

# Baja-Core
Baja-Core is a TSWoW demo library that gives real world examples for TSWoW. This project is not affiliated with TSWoW directly and is a community-driven project. For any questions, comments or concerns please refer to our discord: [link](https://discord.gg/Zy2PY9C3n3)

## Installation
1. Use the TSWoW installation guide: [TSWoW Wiki](https://tswow.github.io/tswow-wiki/home/) 
2. After TSWoW is installed, drag and drop any of the modules into your modules/ folder.
3. Finally, run `build all` to assure all parts are correctly built.

## Current Modules
1. **baja-shared**: This module currently stores a small addon library written in TypeScript. In the future it would house any other libraries that could be reused in other modules. 
    * Created By: @nl

2. **emoji-module**: This module generates m2/skin, as well as spells required to create emoji spells ingame. It takes drag and dropping a blp into the assets/emoji/ folder to generate. 
    * Spell video: [link](https://streamable.com/rfvj7f)
    * Created By: @tester

3. **infinite-dungeon-module**: This module was made to emulate a torghast experience, but without an ending to have infinite scaling. The way it should have been. Creature spawns are randomly generated formations with only a single point given. Adding new dungeons should be fairly simple. 
    * Created By: @tester

4. **item-creation**: Implementation of a runtime item generator for a diablo-like experience. The underlying system can also be used to update already created items. This module also includes a gossip menu reforger.
    * Item Creation video: [link](https://streamable.com/trrnk8)
    * Item Reloading video: [link](https://streamable.com/03u64f)
    * Reforging video: [link](https://streamable.com/x3fx7j)
    * Created By: @tester
    * Balancing Assistance: @Driggs

5. **player-housing-farming-module**: A player housing + farming module, inspired by IHM testing module. This utilizes phasing to accomplish solo player areas. There are functions created for inviting other players to your house.
    * Overview video: [link](https://streamable.com/4n9umf)
    * By: @tester

6. **spell-picker (in progress)**: Pick your spells as you level, as an alternative system to autolearning or trainers. Accessed in-game via the `/sp` or `/spellpicker` commands.
    * Created By: @nl

7. **random-scripts-module**: Small scale creations that do not warrant their own module. You should check the header of any file to see what they are created for as well as specific credits.
    * Created By: Everyone!

8. **spell-skills (in progress)**: Item affixes that increase the damage/healing output of spells. 
    * Created By: @nl

## Note
Any modules seen on secondary branches not merged to the master branch should be considered incomplete and, if used, expect minimal support.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. We are open to any ideas but ask that any module is written to assure it does not impact other possible content.

## License
[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)
