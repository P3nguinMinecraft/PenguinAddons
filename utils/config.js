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
        const names = ["Bal Spawn Beacon",
        "Spawn Alert",
        "Bal Status",
        "Spawn Alert Text",
        "Spawn Alert Color",
        "Invincibility Timer",
        "Timer Color",
        "66% HP Alert",
        "66% Alert Color",
        "50% HP Alert",
        "50% Alert Color",
        "33% HP Alert",
        "33% Alert Color",
        "Lobby Swapper Default Location",
        "Lobby Swapper Default Swap Location"];
        return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    }
})
class settings{
    constructor() {
        this.initialize(this);
        this.addDependency("Spawn Alert Text", "Spawn Alert");
        this.addDependency("Spawn Alert Color", "Spawn Alert");
        this.addDependency("Timer Color","Invincibility Timer");
        this.addDependency("66% Alert Color","66% HP Alert");
        this.addDependency("50% Alert Color","50% HP Alert");
        this.addDependency("33% Alert Color","33% HP Alert");
        this.setCategoryDescription('&4Bal', 'Stuff about Bal');
    }

    @SwitchProperty({
        name: "Bal Spawn Beacon",
        description: "Renders a beacon beam at &4Bal&r's spawn point.",
        category: "&4Bal"
    })
    boolBalBeacon = false;

    @SwitchProperty({
        name: "Bal Status",
        description: "Tells you about Bal when in the Crystal Hollows, like if he is spawning, alive (with HP), dead, or unlocated.",
        category: "&4Bal"
    })

    boolBalHUD = false;
    
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
    txtBalSpawn = "";

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

    @ColorProperty({
        name: "Timer Color",
        category: "&4Bal"
    })
    colorBalTimer = Color.RED;

    @SwitchProperty({
        name: "66% HP Alert",
        description: "Alert when &4Bal &rhits &c66% HP (166)",
        category: "&4Bal"
    })
    boolBal66 = false;

    @ColorProperty({
        name: "66% Alert Color",
        category: "&4Bal"
    })
    colorBal66 = Color.RED;
  
    @SwitchProperty({
        name: "50% HP Alert",
        description: "Alert when &4Bal &rhits &c50% HP (125)",
        category: "&4Bal"
    })
    boolBal50 = false;

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

    @ColorProperty({
        name: "33% Alert Color",
        category: "&4Bal"
    })
    colorBal33 = Color.RED;

    @TextProperty({
        name: "Lobby Swapper Default Location",
        description: "&4There must be a value if you want to use /lobbyswap without parameters. &r&9Example: &r&7Swapping &bcrystal hollows &r&7lobby, then input &a&o'ch', 'crystal', &r&7or &a&o'hollows'. &r&cLocation has to be &o/warp &r&ccompatible, &4AKA you must have the scroll unlocked.",
        category: "&aLobby Swapper"
    })
    defaultLocation = ""

    @TextProperty({
        name: "Lobby Swapper Default Swap Location",
        description: "&4There must be a value if you want to use /lobbyswap without parameters. &r&9Example: &r&7Swapping &bcrystal hollows &r&7lobby, you might swap to the &bhub &r&7and then back to the &bcrystal hollows. &r&7So you would input &a&o'hub' &r&7or &a&o'village'. &r&cSwap location has to be &o/warp &r&ccompatible, &4AKA you must have the scroll unlocked.",
        category: "&aLobby Swapper"
    })
    defaultSwap = ""
}
export default new settings();