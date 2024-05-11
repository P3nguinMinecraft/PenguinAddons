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
@Vigilant("BalAddons","&4Bal&cAddons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['&4Bal','&aLobby Swapper'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getPropertyComparator: () => (a, b) => {
        const names = [
            "Bal Spawn Beacon",
            "Bal Info HUD",
            "Bal Status HUD",
            "Bal Coordinate HUD",
            "Bal HUD Color",
            "Spawn Alert",
            "Spawn Alert Text",
            "Spawn Alert Color",
            "Invincibility Timer",
            "Timer Color",
            "75% HP Alert",
            "75% Alert Text",
            "75% Alert Color",
            "50% HP Alert",
            "50% Alert Text",
            "50% Alert Color",
            "33% HP Alert",
            "33% Alert Text",
            "33% Alert Color",
            "Death Alert",
            "Death Alert Text",
            "Death Alert Color",
            "Lobby Swapper Default Location",
            "Lobby Swapper Default Swap Location"
        ];
        return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    }
})
class settings{
    constructor() {
        this.initialize(this);
        this.addDependency("Bal Status HUD", "Bal Info HUD");
        this.addDependency("Bal Coordinate HUD", "Bal Info HUD");
        this.addDependency("Bal HUD Color", "Bal Info HUD");
        this.addDependency("Spawn Alert Text", "Spawn Alert");
        this.addDependency("Spawn Alert Color", "Spawn Alert");
        this.addDependency("75% Alert Text","75% HP Alert");
        this.addDependency("75% Alert Color","75% HP Alert");
        this.addDependency("50% Alert Text","50% HP Alert");
        this.addDependency("50% Alert Color","50% HP Alert");
        this.addDependency("33% Alert Text","33% HP Alert");
        this.addDependency("33% Alert Color","33% HP Alert");
        this.addDependency("Death Alert Text","Death Alert");
        this.addDependency("Death Alert Color","Death Alert");
        this.setCategoryDescription('&4Bal', 'Stuff about Bal');
    }

    // ikik i need to add screen position config but i cba rn, might make some gui edit code or be lazy and have some sliders for everything

    @SwitchProperty({
        name: "Bal Spawn Beacon",
        description: "Renders a beacon beam at &4Bal&r's spawn point.",
        category: "&4Bal"
    })
    boolBalBeacon = false;

    @SwitchProperty({
        name: "Bal Info HUD",
        description: "Provides useful information about &4Bal &rwhen in the &aCrystal Hollows&r, such as phase and coordinates.",
        category: "&4Bal"
    })

    boolBalHUD = false;

    @SwitchProperty({
        name: "Bal Status HUD",
        description: "Tells you if &4Bal &ris spawning, alive (with HP estimates), dead, or unlocated.",
        category: "&4Bal"
    })
    boolBalStatusHUD = false;

    @SwitchProperty({
        name: "Bal Coordinate HUD",
        description: "Shows the coordinates of &4Bal &rwhen it is alive, spawning, or dead.",
        category: "&4Bal"
    })
    boolBalCoordHUD = false;

    @ColorProperty({
        name: "Bal HUD Color",
        category: "&4Bal"
    })
    colorBalHUD = Color.RED;
    
    @SwitchProperty({
        name: "Spawn Alert",
        description: "Tells you when &4Bal &rspawns.",
        category: "&4Bal"
    })
    boolBalSpawn = false;
    
    @TextProperty({
        name: "Spawn Alert Text",
        category: "&4Bal"
    })
    txtBalSpawn = "Bal Spawning";

    @ColorProperty({
        name: "Spawn Alert Color",
        category: "&4Bal"
    })
    colorBalSpawn = Color.RED;

    @SwitchProperty({
        name: "Invincibility Timer",
        description: "Countdown until &4Bal &rcan be damaged.",
        category: "&4Bal"
    })
    boolBalTimer = false;

    @SwitchProperty({
        name: "75% HP Alert",
        description: "Alert when &4Bal &rhits &c75% HP (187)",
        category: "&4Bal"
    })
    boolBal75 = false;

    @TextProperty({
        name: "75% Alert Text",
        category: "&4Bal"
    })
    txtBal75 = "75% HP";

    @ColorProperty({
        name: "75% Alert Color",
        category: "&4Bal"
    })
    colorBal75 = Color.RED;
  
    @SwitchProperty({
        name: "50% HP Alert",
        description: "Alert when &4Bal &rhits &c50% HP (125)",
        category: "&4Bal"
    })
    boolBal50 = false;

    @TextProperty({
        name: "50% Alert Text",
        category: "&4Bal"
    })
    txtBal50 = "50% HP";

    @ColorProperty({
        name: "50% Alert Color",
        category: "&4Bal"
    })
    colorBal50 = Color.RED;

    @SwitchProperty({
        name: "33% HP Alert",
        description: "Alert when &4Bal &rhits &c33% HP (66)",
        category: "&4Bal"
    })
    boolBal33 = false;

    @TextProperty({
        name: "33% Alert Text",
        category: "&4Bal"
    })
    txtBal33 = "33% HP";

    @ColorProperty({
        name: "33% Alert Color",
        category: "&4Bal"
    })
    colorBal33 = Color.RED;

    @SwitchProperty({
        name: "Death Alert",
        description: "Tells you when &4Bal &rdies.",
        category: "&4Bal"
    })
    boolBalDeath = false;

    @TextProperty({
        name: "Death Alert Text",
        category: "&4Bal"
    })
    txtBalDeath = "Bal Died";

    @ColorProperty({
        name: "Death Alert Color",
        category: "&4Bal"
    })
    colorBalDeath = Color.RED;

    @TextProperty({
        name: "Lobby Swapper Default Location",
        description: "&4There must be a value if you want to use /lobbyswap without parameters. &r&9Example: &r&7Swapping &bcrystal hollows &r&7lobby, then input &a&o'ch', 'crystal', &r&7or &a&o'hollows'. &r&cLocation has to be &o/warp &r&ccompatible, &4AKA you must have the scroll unlocked.",
        category: "&aLobby Swapper"
    })
    defaultLocation = "";

    @TextProperty({
        name: "Lobby Swapper Default Swap Location",
        description: "&4There must be a value if you want to use /lobbyswap without parameters. &r&9Example: &r&7Swapping &bcrystal hollows &r&7lobby, you might swap to the &bhub &r&7and then back to the &bcrystal hollows. &r&7So you would input &a&o'hub' &r&7or &a&o'village'. &r&cSwap location has to be &o/warp &r&ccompatible, &4AKA you must have the scroll unlocked.",
        category: "&aLobby Swapper"
    })
    defaultSwap = "";
}
export default new settings();