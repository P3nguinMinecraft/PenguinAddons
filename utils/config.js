import {
    @Vigilant, 
    @SwitchProperty, 
    @TextProperty, 
    @CheckboxProperty, 
    @ButtonProperty, 
    @SelectorProperty, 
    @SliderProperty, 
    @ColorProperty, 
    @PercentSliderProperty, 
    @DecimalSliderProperty, 
    Color
} from "../../Vigilance/index";
@Vigilant("PenguinAddons","PenguinAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Main','Bal','Lobby Swapper','Powder Mining'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }, 
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ["Bal Info", "Bal Timers", "Bal Alerts", "Powder Chests", "Compact Messages"];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },
    getPropertyComparator: () => (a, b) => {
        const names = [
            "GUI Settings",
            "Bal Waypoint",
            "Bal Info HUD",
            "Bal Status HUD",
            "Bal Status HUD Color",
            "Bal Coordinate HUD",
            "Bal Coordinate HUD Color",
            "Invincibility Timer",
            "Spawning Timer",
            "Spawn Alert",
            "Spawn Alert Text",
            "Spawn Alert Color",
            "Timer Color",
            "75 Percent HP Alert",
            "75 Percent Alert Text",
            "75 Percent Alert Color",
            "50 Percent HP Alert",
            "50 Percent Alert Text",
            "50 Percent Alert Color",
            "33 Percent HP Alert",
            "33 Percent Alert Text",
            "33 Percent Alert Color",
            "Death Alert",
            "Death Alert Text",
            "Death Alert Color",
            "Lobby Swapper Default Location",
            "Lobby Swapper Default Swap Location",
            "Anti Spleef",
            "Powder Chest Highlight",
            "Highlight Through Walls",
            "Scan Method",
            "Scan Radius",
            "Clear Powder Chests",
            "Compact Powder Messages",
            "Show Essence",
            "Show Flawless Gemstones",
            "Show Goblin Eggs",
            "Show Robot Parts",
            "Show Treasurite"
        ];
        return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    }
})
class settings{
    constructor() {
        this.initialize(this);
        this.addDependency("Bal Status HUD", "Bal Info HUD");
        this.addDependency("Bal Status HUD Color", "Bal Info HUD");
        this.addDependency("Bal Coordinate HUD", "Bal Info HUD");
        this.addDependency("Bal Coordinate HUD Color", "Bal Info HUD");
        this.addDependency("Spawn Alert Text", "Spawn Alert");
        this.addDependency("Spawn Alert Color", "Spawn Alert");
        this.addDependency("75 Percent Alert Text","75 Percent HP Alert");
        this.addDependency("75 Percent Alert Color","75 Percent HP Alert");
        this.addDependency("50 Percent Alert Text","50 Percent HP Alert");
        this.addDependency("50 Percent Alert Color","50 Percent HP Alert");
        this.addDependency("33 Percent Alert Text","33 Percent HP Alert");
        this.addDependency("33 Percent Alert Color","33 Percent HP Alert");
        this.addDependency("Death Alert Text","Death Alert");
        this.addDependency("Death Alert Color","Death Alert");
        this.addDependency("Highlight Through Walls", "Powder Chest Highlight");
        this.addDependency("Scan Method", "Powder Chest Highlight");
        this.addDependency("Scan Radius", "Powder Chest Highlight");
        this.addDependency("Show Essence", "Compact Powder Messages");
        this.addDependency("Show Flawless Gemstones", "Compact Powder Messages");
        this.addDependency("Show Goblin Eggs", "Compact Powder Messages");
        this.addDependency("Show Robot Parts", "Compact Powder Messages");
        this.addDependency("Show Treasurite", "Compact Powder Messages");
        this.setCategoryDescription("Main","Home page for PenguinAddons");
        this.setCategoryDescription("Bal", "Stuff about Bal");
        this.setCategoryDescription("Lobby Swapper", "Settings for /lobbyswap Command");
        this.setCategoryDescription("Powder Mining", "QOL Stuff for Powder Mining");
    }

    // ikik i need to add screen position config but i cba rn, might make some gui edit code or be lazy and have some sliders for everything
    @ButtonProperty({
        name: "GUI Settings",
        description: "Click here to edit GUI locations.",
        category: "Main",
        placeholder: "Click!"
        })
    gui(){
        Client.currentGui.close()
        ChatLib.simulateChat("[PenguinAddons] Overlay Config Gui")
    }

    @SwitchProperty({
        name: "Bal Waypoint",
        description: "Renders a waypoint at &4Bal&r's spawn point.",
        category: "Bal"
    })
    boolBalWaypoint = false;

    @SwitchProperty({
        name: "Bal Info HUD",
        description: "Provides useful information about &4Bal &rwhen in the &aCrystal Hollows&r, such as phase and coordinates.",
        category: "Bal",
        subcategory: "Bal Info"
    })
    boolBalHUD = false;

    @SwitchProperty({
        name: "Bal Status HUD",
        description: "Tells you if &4Bal &ris spawning, alive (with HP estimates), dead, or unlocated.",
        category: "Bal",
        subcategory: "Bal Info"
    })
    boolBalStatusHUD = false;

    @ColorProperty({
        name: "Bal Status HUD Color",
        category: "Bal",
        subcategory: "Bal Info"
    })
    colorBalStatusHUD = Color.RED;

    @SwitchProperty({
        name: "Bal Coordinate HUD",
        description: "Shows the coordinates of &4Bal &rwhen it is alive, spawning, or dead.",
        category: "Bal",
        subcategory: "Bal Info"
    })
    boolBalCoordHUD = false;

    @ColorProperty({
        name: "Bal Coordinate HUD Color",
        category: "Bal",
        subcategory: "Bal Info"
    })
    colorBalCoordHUD = Color.RED;

    @SwitchProperty({
        name: "Invincibility Timer",
        description: "Countdown until &4Bal &rcan be damaged.",
        category: "Bal",
        subcategory: "Bal Timers"
    })
    boolBalSpawnTimer = false;

    @SwitchProperty({
        name: "Spawning Timer",
        description: "Countdown until &4Bal &rstarts spawning.",
        category: "Bal",
        subcategory: "Bal Timers"
    })
    boolBalDeadTimer = false;

    @SwitchProperty({
        name: "Spawn Alert",
        description: "Tells you when &4Bal &rspawns.",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    boolBalSpawn = false;
    
    @TextProperty({
        name: "Spawn Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    txtBalSpawn = "Bal Spawning";

    @ColorProperty({
        name: "Spawn Alert Color",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    colorBalSpawn = Color.RED;

    @SwitchProperty({
        name: "75 Percent HP Alert",
        description: "Alert when &4Bal &rhits &c75 percent HP (187)",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    boolBal75 = false;

    @TextProperty({
        name: "75 Percent Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    txtBal75 = "75% HP";

    @ColorProperty({
        name: "75 Percent Alert Color",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    colorBal75 = Color.RED;
  
    @SwitchProperty({
        name: "50 Percent HP Alert",
        description: "Alert when &4Bal &rhits &c50 percent HP (125)",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    boolBal50 = false;

    @TextProperty({
        name: "50 Percent Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    txtBal50 = "50% HP";

    @ColorProperty({
        name: "50 Percent Alert Color",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    colorBal50 = Color.RED;

    @SwitchProperty({
        name: "33 Percent HP Alert",
        description: "Alert when &4Bal &rhits &c33 percent HP (66)",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    boolBal33 = false;

    @TextProperty({
        name: "33 Percent Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    txtBal33 = "33% HP";

    @ColorProperty({
        name: "33 Percent Alert Color",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    colorBal33 = Color.RED;

    @SwitchProperty({
        name: "Death Alert",
        description: "Tells you when &4Bal &rdies.",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    boolBalDeath = false;

    @TextProperty({
        name: "Death Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    txtBalDeath = "Bal Died";

    @ColorProperty({
        name: "Death Alert Color",
        category: "Bal",
        subcategory: "Bal Alerts"
    })
    colorBalDeath = Color.RED;

    @TextProperty({
        name: "Lobby Swapper Default Location",
        description: "&4There must be a value if you want to use /lobbyswap without parameters. &r&9Example: &r&7Swapping &bcrystal hollows &r&7lobby, then input &a&o'ch', 'crystal', &r&7or &a&o'hollows'. &r&cLocation has to be &o/warp &r&ccompatible, &4AKA you must have the scroll unlocked.",
        placeholder: "Examples: hub, ch, dhub, jungle",
        category: "Lobby Swapper"
    })
    defaultLocation = "";

    @TextProperty({
        name: "Lobby Swapper Default Swap Location",
        description: "&4There must be a value if you want to use /lobbyswap without parameters. &r&9Example: &r&7Swapping &bcrystal hollows &r&7lobby, you might swap to the &bhub &r&7and then back to the &bcrystal hollows. &r&7So you would input &a&o'hub' &r&7or &a&o'village'. &r&cSwap location has to be &o/warp &r&ccompatible, &4AKA you must have the scroll unlocked.",
        placeholder: "Examples: hub, ch, dhub, jungle",
        category: "Lobby Swapper"
    })
    defaultSwap = "";

    @SwitchProperty({
        name: "Anti Spleef",
        description: "Stops you from mining down (good for powder grinding, making tunnels, scatha grinding). You can still mine down if you are right above the block you are mining.",
        category: "Powder Mining"
    })
    boolAntiSpleef = false;
    
    @SwitchProperty({
        name: "Powder Chest Highlight",
        description: "Highlights powder chests when uncovered.",
        category: "Powder Mining",
        subcategory: "Powder Chests"
    })
    boolChestHighlight = false;

    @SwitchProperty({
        name: "Highlight Through Walls",
        description: "The highlight can be seen through blocks. Turning it off also makes the chests look like villagers.",
        category: "Powder Mining",
        subcategory: "Powder Chests"
    })
    boolChestHighlightPhase = false;


    @SelectorProperty({
        name: "Scan Method",
        description: "Choose the method to scan for chests. Message Activation will scan for chests when a chest spawns or is opened. Every 1 Second will scan for chests every second while in the Crystal Hollows: Useful for people with high ping and is more resource intensive.",
        category: "Powder Mining",
        subcategory: "Powder Chests",
        options: ["Message Activation", "Every 1 Second"]
    })
    intChestScanMethod = 0;

    @SliderProperty({
        name: "Scan Radius",
        description: "How far to scan for powder chests.",
        min: 0,
        max: 32,
        category: "Powder Mining",
        subcategory: "Powder Chests"
    })
    scanRadius = 0;

    @ButtonProperty({
        name: "Clear Powder Chests",
        description: "Click here to clear all stored chest data for Powder Chest Highlight.",
        category: "Powder Mining",
        subcategory: "Powder Chests",
        placeholder: "Click!"
        })
    clearchests(){
        ChatLib.simulateChat("[PenguinAddons] Cleared Powder Chests")
    }

    @SwitchProperty({
        name: "Compact Powder Messages",
        description: "Compacts powder messages that appear when you open a chest.",
        category: "Powder Mining",
        subcategory: "Compact Messages"
    })
    boolCompactPowder = false;

    @CheckboxProperty({
        name: "Show Essence",
        description: "Shows gold and diamond essence in the compacted message.",
        category: "Powder Mining",
        subcategory: "Compact Messages"
    })
    boolCompactEssence = false;

    @CheckboxProperty({
        name: "Show Flawless Gemstones",
        description: "Shows flawless gemstones in the compacted message.",
        category: "Powder Mining",
        subcategory: "Compact Messages"
    })
    boolCompactFlawless = false;

    @CheckboxProperty({
        name: "Show Goblin Eggs",
        description: "Shows goblin eggs in the compacted message.",
        category: "Powder Mining",
        subcategory: "Compact Messages"
    })
    boolCompactEgg = false;

    @CheckboxProperty({
        name: "Show Robot Parts",
        description: "Shows robot parts in the compacted message.",
        category: "Powder Mining",
        subcategory: "Compact Messages"
    })
    boolCompactRobot = false;

    @CheckboxProperty({
        name: "Show Treasurite",
        description: "Shows treasurite in the compacted message.",
        category: "Powder Mining",
        subcategory: "Compact Messages"
    })
    boolCompactTreasurite = false;
}
export default new settings();  