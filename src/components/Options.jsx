const SelectTravelList = [
    {
        id: 1,
        title: "No interaction",
        desc: "No crowd",
        icon: "🏞️",
        people: "1"
    },
    {
        id: 2,
        title: "Minimal interaction",
        desc: "Low crowd",
        icon: "📘",
        people: "1"
    },
    {
        id: 3,
        title: "Friendly interactions",
        desc: "Crowded places aren't a problem",
        icon: "👋😄",
        people: "1"
    },
];

const SelectBudgetList = [
    {
        id: 1,
        title: "Cheap",
        desc: "Explore more for less with budget-effective travel.",
        icon: "💸",
        people: "1"
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Well-priced options that suit your preferences.",
        icon: "💲",
        people: "1"
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Get exceptional travel experience",
        icon: "💵",
        people: "1"
    }
];
const DestinationType = [
    {
        id: 1,
        title: "Nature focused",
        desc: "e.g., mountains, beaches, forests",
        icon: "🌳",
        people: "1"
    },
    {
        id: 2,
        title: "Bustling Destinations",
        desc: "e.g., malls, local markets",
        icon: "🏙️",
        people: "1"
    },
    {
        id: 3,
        title: "Urban retreats",
        desc: "e.g., parks, libraries, museums",
        icon: "🎨",
        people: "1"
    }
];
const Eating = [
    {
        id: 1,
        title: "No food",
        desc: "Not craving for now",
        icon: "🍽️🚫",
        
    },
    {
        id: 2,
        title: "Snacks",
        desc: "Light snacks to boost mood",
        icon: "🍿",
        
    },
    {
        id: 3,
        title: "Meal",
        desc: "Wholesome meal, wholesome day",
        icon: "🥗",
        
    }
];
const Timeofday = [
    {
        id: 1,
        title: "Morning",
        desc: "7am to 12pm",
        icon: "🌅",
        
    },
    {
        id: 2,
        title: "Evening",
        desc: "1pm to 6pm",
        icon: "🌇",
        
    },
    {
        id: 3,
        title: "Night",
        desc: "6pm to 3am",
        icon: "🌃",
        
    }
];


export const AI_PROMPT = "Generate Travel Plan for Location :{location} for {noOfhrs} hours with a Budget:{budget} budget for Destination Type: {Destination} at the {Timeoftheday} also conside the crowd Type: {Social} , give Places list with PlaceName, Placeaddress, Price, Place image url, Geocoordinates , Rating , Descriptions in JSON format.Give good Restaurants list for Budget :{budget} for food type : {Eating} , give Restaurants list with RestaurantName, Restaurantaddress, Price, Placeimageurl, geo coordinates , Rating , Descriptions  in JSON format. all the headers should start with capital letter";
 

// Combine all into a single object and export it as default
export default {
    SelectTravelList,
    SelectBudgetList,
    DestinationType,
    Timeofday,
    Eating,
    
};