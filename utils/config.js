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
@Vigilant("BalAddons","BalAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Main','Bal','Lobby Swapper','Powder Mining'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
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
            "Spawn Alert",
            "Spawn Alert Text",
            "Spawn Alert Color",
            "Invincibility Timer",
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
            "Powder Chest Highlight",
            "Scan Radius"
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
        this.addDependency("Scan Radius", "Powder Chest Highlight");
        this.setCategoryDescription("Main","Home page for BalAddons");
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
        Client.settings.close()
        ChatLib.chat("maybe worked")
        ChatLib.say("/ba gui")
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
        category: "Bal"
    })
    boolBalHUD = false;

    @SwitchProperty({
        name: "Bal Status HUD",
        description: "Tells you if &4Bal &ris spawning, alive (with HP estimates), dead, or unlocated.",
        category: "Bal"
    })
    boolBalStatusHUD = false;

    @ColorProperty({
        name: "Bal Status HUD Color",
        category: "Bal"
    })
    colorBalStatusHUD = Color.RED;

    @SwitchProperty({
        name: "Bal Coordinate HUD",
        description: "Shows the coordinates of &4Bal &rwhen it is alive, spawning, or dead.",
        category: "Bal"
    })
    boolBalCoordHUD = false;

    @ColorProperty({
        name: "Bal Coordinate HUD Color",
        category: "Bal"
    })
    colorBalCoordHUD = Color.RED;

    @SwitchProperty({
        name: "Spawn Alert",
        description: "Tells you when &4Bal &rspawns.",
        category: "Bal"
    })
    boolBalSpawn = false;
    
    @TextProperty({
        name: "Spawn Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal"
    })
    txtBalSpawn = "Bal Spawning";

    @ColorProperty({
        name: "Spawn Alert Color",
        category: "Bal"
    })
    colorBalSpawn = Color.RED;

    @SwitchProperty({
        name: "Invincibility Timer",
        description: "Countdown until &4Bal &rcan be damaged.",
        category: "Bal"
    })
    boolBalTimer = false;

    @SwitchProperty({
        name: "75 Percent HP Alert",
        description: "Alert when &4Bal &rhits &c75 percent HP (187)",
        category: "Bal"
    })
    boolBal75 = false;

    @TextProperty({
        name: "75 Percent Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal"
    })
    txtBal75 = "75% HP";

    @ColorProperty({
        name: "75 Percent Alert Color",
        category: "Bal"
    })
    colorBal75 = Color.RED;
  
    @SwitchProperty({
        name: "50 Percent HP Alert",
        description: "Alert when &4Bal &rhits &c50 percent HP (125)",
        category: "Bal"
    })
    boolBal50 = false;

    @TextProperty({
        name: "50 Percent Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal"
    })
    txtBal50 = "50% HP";

    @ColorProperty({
        name: "50 Percent Alert Color",
        category: "Bal"
    })
    colorBal50 = Color.RED;

    @SwitchProperty({
        name: "33 Percent HP Alert",
        description: "Alert when &4Bal &rhits &c33 percent HP (66)",
        category: "Bal"
    })
    boolBal33 = false;

    @TextProperty({
        name: "33 Percent Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal"
    })
    txtBal33 = "33% HP";

    @ColorProperty({
        name: "33 Percent Alert Color",
        category: "Bal"
    })
    colorBal33 = Color.RED;

    @SwitchProperty({
        name: "Death Alert",
        description: "Tells you when &4Bal &rdies.",
        category: "Bal"
    })
    boolBalDeath = false;

    @TextProperty({
        name: "Death Alert Text",
        decription: "Text that appears when the alert is triggered.",
        placeholder: "Blank = Nothing Appears",
        category: "Bal"
    })
    txtBalDeath = "Bal Died";

    @ColorProperty({
        name: "Death Alert Color",
        category: "Bal"
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
        name: "Powder Chest Highlight",
        description: "Highlights powder chests when found.",
        category: "Powder Mining"
    })
    boolChestHighlight = false;

    @SliderProperty({
        name: "Scan Radius",
        description: "How far to scan for powder chests.",
        min: 0,
        max: 32,
        category: "Powder Mining"
    })
    scanRadius = 0;
}
export default new settings();