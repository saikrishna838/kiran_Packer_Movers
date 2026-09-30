import { useEffect, useState } from "react";

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [customLocations, setCustomLocations] = useState(() => {
    try {
      const savedLocations = localStorage.getItem("kiranServiceAreaLocations");
      if (savedLocations) {
        const parsedLocations = JSON.parse(savedLocations);
        return Array.isArray(parsedLocations) ? parsedLocations : [];
      }
    } catch (error) {
      console.error("Unable to load saved service areas.", error);
    }
    return [];
  });
  const [newLocation, setNewLocation] = useState({
    city: "",
    state: "Telangana",
    startingPrice: "₹3,999",
    movingTime: "Same-day local support",
  });

  const company = {
    name: "Kiran Packers And Movers",
    shortName: "Kiran Packers",
    phone: "08128538551",
    whatsapp: "918128538551",
    email: "kiranpackersandmovers@gmail.com",
    address:
      "9-1-218, Street No. 7, Mukarampura, Mahalaxmi Supermarket, Karimnagar-505002, Telangana",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Kiran+Packers+And+Movers%2C+9-1-218%2C+Street+No.+7%2C+Mukarampura%2C+Karimnagar%2C+Telangana",
  };

  const getUserLocation = () => {

    if (!navigator.geolocation) {
      setLocationMessage(
        "Location access is not supported by this browser."
      );
      return;
    }

    setLocationMessage("Requesting location access...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setUserLocation({
          latitude,
          longitude,
        });

        setLocationMessage(
          "Your current location has been accessed successfully."
        );
      },
      (error) => {
        if (error.code === 1) {
          setLocationMessage(
            "Location access was denied. Please allow location permission in your browser."
          );
        } else if (error.code === 2) {
          setLocationMessage(
            "Your location could not be determined. Please try again."
          );
        } else {
          setLocationMessage(
            "Unable to access your location right now. Please try again."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const services = [
    {
      icon: "🏠",
      title: "House Shifting",
      text: "Complete residential relocation with careful packing, loading, transportation and unloading.",
    },
    {
      icon: "🏢",
      title: "Office Relocation",
      text: "Organised office shifting designed to reduce downtime and keep your workplace move smooth.",
    },
    {
      icon: "📦",
      title: "Packing & Unpacking",
      text: "Careful packing solutions for furniture, household items, electronics, documents and valuables.",
    },
    {
      icon: "🚚",
      title: "Local Shifting",
      text: "Reliable moving assistance for local household and commercial relocations within Karimnagar.",
    },
    {
      icon: "🛣️",
      title: "Intercity Relocation",
      text: "Door-to-door relocation support for moving between cities with organised transportation.",
    },
    {
      icon: "🏍️",
      title: "Vehicle Transportation",
      text: "Transportation assistance for bikes, scooters and other personal vehicles.",
    },
  ];

  const advantages = [
    {
      icon: "📦",
      title: "Careful Packing",
      text: "Items are organised and packed according to their type and handling requirements.",
    },
    {
      icon: "🚛",
      title: "Reliable Transportation",
      text: "Planned transportation support for local and long-distance movement.",
    },
    {
      icon: "👷",
      title: "Moving Assistance",
      text: "A practical team approach for loading, unloading and shifting activities.",
    },
    {
      icon: "📍",
      title: "Door-to-Door Support",
      text: "From pickup to delivery, we help coordinate the important stages of your move.",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Share Your Requirement",
      text: "Tell us your pickup location, destination and the type of items you need to move.",
    },
    {
      number: "02",
      title: "Plan The Move",
      text: "We understand the shifting requirement and organise the appropriate moving support.",
    },
    {
      number: "03",
      title: "Pack & Load",
      text: "Your belongings are packed, arranged and loaded carefully for transportation.",
    },
    {
      number: "04",
      title: "Transport",
      text: "The packed items are transported towards the destination as planned.",
    },
    {
      number: "05",
      title: "Unload & Settle",
      text: "Items are unloaded at the destination and the move is brought to completion.",
    },
  ];

  const serviceAreas = [
    {
      city: "Karimnagar",
      district: "Karimnagar",
      location: "Karimnagar, Telangana, India",
      distance: "Local service area",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,500",
      office: "₹7,000",
    },

    {
      city: "Bhupalapally",
      district: "Jayashankar Bhupalapally",
      location:
        "Bhupalapally, Jayashankar Bhupalapally, Telangana, India",
      distance: "Approx. 120 km from Karimnagar",
      localPrice: "₹2,500",
      oneBHK: "₹6,500",
      twoBHK: "₹9,500",
      threeBHK: "₹13,500",
      office: "₹8,000",
    },

    {
      city: "Peddapalli",
      district: "Peddapalli",
      location: "Peddapalli, Telangana, India",
      distance: "Approx. 40 km from Karimnagar",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,500",
      office: "₹7,000",
    },

    {
      city: "Ramagundam",
      district: "Peddapalli",
      location: "Ramagundam, Peddapalli, Telangana, India",
      distance: "Approx. 65 km from Karimnagar",
      localPrice: "₹2,200",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },

    {
      city: "Mancherial",
      district: "Mancherial",
      location: "Mancherial, Telangana, India",
      distance: "Approx. 75 km from Karimnagar",
      localPrice: "₹2,500",
      oneBHK: "₹6,000",
      twoBHK: "₹9,000",
      threeBHK: "₹12,500",
      office: "₹7,500",
    },

    {
      city: "Jagtial",
      district: "Jagtial",
      location: "Jagtial, Telangana, India",
      distance: "Approx. 50 km from Karimnagar",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,000",
      office: "₹7,000",
    },

    {
      city: "Sircilla",
      district: "Rajanna Sircilla",
      location: "Sircilla, Rajanna Sircilla, Telangana, India",
      distance: "Approx. 65 km from Karimnagar",
      localPrice: "₹2,200",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹11,500",
      office: "₹7,000",
    },

    {
      city: "Vemulawada",
      district: "Rajanna Sircilla",
      location: "Vemulawada, Rajanna Sircilla, Telangana, India",
      distance: "Approx. 50 km from Karimnagar",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,000",
      office: "₹7,000",
    },

    {
      city: "Siddipet",
      district: "Siddipet",
      location: "Siddipet, Telangana, India",
      distance: "Approx. 110 km from Karimnagar",
      localPrice: "₹2,800",
      oneBHK: "₹6,500",
      twoBHK: "₹9,500",
      threeBHK: "₹13,500",
      office: "₹8,000",
    },

    {
      city: "Warangal",
      district: "Warangal",
      location: "Warangal, Telangana, India",
      distance: "Approx. 150 km from Karimnagar",
      localPrice: "₹3,000",
      oneBHK: "₹7,000",
      twoBHK: "₹10,500",
      threeBHK: "₹15,000",
      office: "₹9,000",
    },

    {
      city: "Hanamkonda",
      district: "Hanamkonda",
      location: "Hanamkonda, Telangana, India",
      distance: "Approx. 150 km from Karimnagar",
      localPrice: "₹3,000",
      oneBHK: "₹7,000",
      twoBHK: "₹10,500",
      threeBHK: "₹15,000",
      office: "₹9,000",
    },

    {
      city: "Hyderabad",
      district: "Hyderabad",
      location: "Hyderabad, Telangana, India",
      distance: "Approx. 165 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Secunderabad",
      district: "Hyderabad",
      location: "Secunderabad, Telangana, India",
      distance: "Approx. 165 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Nizamabad",
      district: "Nizamabad",
      location: "Nizamabad, Telangana, India",
      distance: "Approx. 125 km from Karimnagar",
      localPrice: "₹3,000",
      oneBHK: "₹7,000",
      twoBHK: "₹10,500",
      threeBHK: "₹14,500",
      office: "₹9,000",
    },

    {
      city: "Adilabad",
      district: "Adilabad",
      location: "Adilabad, Telangana, India",
      distance: "Approx. 160 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹7,500",
      twoBHK: "₹11,000",
      threeBHK: "₹15,500",
      office: "₹9,500",
    },

    {
      city: "Khammam",
      district: "Khammam",
      location: "Khammam, Telangana, India",
      distance: "Approx. 220 km from Karimnagar",
      localPrice: "₹4,000",
      oneBHK: "₹8,500",
      twoBHK: "₹13,000",
      threeBHK: "₹18,000",
      office: "₹11,000",
    },

    {
      city: "Nalgonda",
      district: "Nalgonda",
      location: "Nalgonda, Telangana, India",
      distance: "Approx. 220 km from Karimnagar",
      localPrice: "₹4,000",
      oneBHK: "₹8,500",
      twoBHK: "₹13,000",
      threeBHK: "₹18,000",
      office: "₹11,000",
    },

    {
      city: "Suryapet",
      district: "Suryapet",
      location: "Suryapet, Telangana, India",
      distance: "Approx. 190 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Mahbubnagar",
      district: "Mahbubnagar",
      location: "Mahbubnagar, Telangana, India",
      distance: "Approx. 300 km from Karimnagar",
      localPrice: "₹4,500",
      oneBHK: "₹9,000",
      twoBHK: "₹14,000",
      threeBHK: "₹20,000",
      office: "₹12,000",
    },

    {
      city: "Medak",
      district: "Medak",
      location: "Medak, Telangana, India",
      distance: "Approx. 180 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Bhongir",
      district: "Yadadri Bhuvanagiri",
      location:
        "Bhongir, Yadadri Bhuvanagiri, Telangana, India",
      distance: "Approx. 190 km from Karimnagar",
      localPrice: "₹3,500",
      oneBHK: "₹8,000",
      twoBHK: "₹12,000",
      threeBHK: "₹17,000",
      office: "₹10,000",
    },

    {
      city: "Jangaon",
      district: "Jangaon",
      location: "Jangaon, Telangana, India",
      distance: "Approx. 150 km from Karimnagar",
      localPrice: "₹3,000",
      oneBHK: "₹7,000",
      twoBHK: "₹10,500",
      threeBHK: "₹15,000",
      office: "₹9,000",
    },

    {
      city: "Kothagudem",
      district: "Bhadradri Kothagudem",
      location:
        "Kothagudem, Bhadradri Kothagudem, Telangana, India",
      distance: "Approx. 270 km from Karimnagar",
      localPrice: "₹4,500",
      oneBHK: "₹9,000",
      twoBHK: "₹14,000",
      threeBHK: "₹20,000",
      office: "₹12,000",
    },

    {
      city: "Miryalaguda",
      district: "Nalgonda",
      location: "Miryalaguda, Nalgonda, Telangana, India",
      distance: "Approx. 250 km from Karimnagar",
      localPrice: "₹4,000",
      oneBHK: "₹8,500",
      twoBHK: "₹13,000",
      threeBHK: "₹18,000",
      office: "₹11,000",
    },

    {
      city: "Huzurabad",
      district: "Karimnagar",
      location: "Huzurabad, Karimnagar district, Telangana, India",
      distance: "Approx. 40 km from Karimnagar",
      localPrice: "₹2,000",
      oneBHK: "₹5,500",
      twoBHK: "₹8,000",
      threeBHK: "₹11,000",
      office: "₹7,000",
    },

    {
      city: "Manakondur",
      district: "Karimnagar",
      location: "Manakondur, Karimnagar district, Telangana, India",
      distance: "Approx. 25 km from Karimnagar",
      localPrice: "₹1,800",
      oneBHK: "₹5,000",
      twoBHK: "₹7,500",
      threeBHK: "₹10,500",
      office: "₹6,500",
    },

    {
      city: "Choppadandi",
      district: "Karimnagar",
      location: "Choppadandi, Karimnagar district, Telangana, India",
      distance: "Approx. 25 km from Karimnagar",
      localPrice: "₹1,800",
      oneBHK: "₹5,000",
      twoBHK: "₹7,500",
      threeBHK: "₹10,500",
      office: "₹6,500",
    },

    {
      city: "Jammikunta",
      district: "Karimnagar",
      location: "Jammikunta, Telangana, India",
      distance: "Approx. 60 km from Karimnagar",
      localPrice: "₹2,200",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },

    {
      city: "Husnabad",
      district: "Siddipet",
      location: "Husnabad, Siddipet district, Telangana, India",
      distance: "Approx. 70 km from Karimnagar",
      localPrice: "₹2,200",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },

    {
      city: "Korutla",
      district: "Jagtial",
      location: "Korutla, Jagtial district, Telangana, India",
      distance: "Approx. 75 km from Karimnagar",
      localPrice: "₹2,300",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },

    {
      city: "Metpally",
      district: "Jagtial",
      location: "Metpally, Jagtial district, Telangana, India",
      distance: "Approx. 90 km from Karimnagar",
      localPrice: "₹2,500",
      oneBHK: "₹6,000",
      twoBHK: "₹9,000",
      threeBHK: "₹12,500",
      office: "₹7,500",
    },

    {
      city: "Dharmapuri",
      district: "Jagtial",
      location: "Dharmapuri, Jagtial district, Telangana, India",
      distance: "Approx. 75 km from Karimnagar",
      localPrice: "₹2,300",
      oneBHK: "₹5,800",
      twoBHK: "₹8,500",
      threeBHK: "₹12,000",
      office: "₹7,500",
    },
  ];

  const filteredCities = serviceAreas.filter((area) => {
    const search = searchCity.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      area.city.toLowerCase().includes(search) ||
      area.district.toLowerCase().includes(search) ||
      area.location.toLowerCase().includes(search)
    );
  });


  const screenshotServiceAreas = [
    "Karimnagar",
    "Peddapalli",
    "Kamareddy",
    "Sircilla",
    "Gajwel",
    "Jagtial",
    "Jangaon",
    "Godavarikhani",
    "Basanth Nagar",
    "Manthani",
    "Bhupalapally",
    "Hyderabad",
    "Siddipet",
    "Rangareddy",
    "Medak",
    "Ellareddypet",
    "Korutla",
    "Metpally",
    "Nirmal",
    "Adilabad",
    "Madhapur",
    "Godichirowli",
    "Kondapur",
    "High-Tech City",
    "Medchal",
    "Pragathi Nagar",
    "Mumbai",
    "Thane",
    "Mulund",
    "Ghatkopar",
    "Kurla",
    "Dadar",
    "Kalyan",
    "Dombivli",
    "Pune",
    "Bangalore",
    "Chennai",
    "Rajahmundry",
    "Vijayawada",
    "Visakhapatnam",
  ].map((city) => {
    const existing = serviceAreas.find(
      (area) =>
        area.city.toLowerCase() === city.toLowerCase()
    );

    const defaults = {
      district: "Telangana",
      location: `${city}, Telangana, India`,
      distance: "Long-distance service area",
      localPrice: "₹3,999",
      oneBHK: "₹6,999",
      twoBHK: "₹9,999",
      threeBHK: "₹12,999",
      office: "₹8,999",
      areasCovered: "Service available",
      branch: false,
    };

    return {
      ...defaults,
      ...(existing || {}),
      city,
    };
  });

  const filteredScreenshotServiceAreas = screenshotServiceAreas.filter((area) => {
    const search = searchCity.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      area.city.toLowerCase().includes(search) ||
      area.location.toLowerCase().includes(search) ||
      area.district.toLowerCase().includes(search)
    );
  });

  const filteredCustomLocations = customLocations.filter((area) => {
    const search = searchCity.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      area.city.toLowerCase().includes(search) ||
      area.location.toLowerCase().includes(search) ||
      area.district.toLowerCase().includes(search)
    );
  });

  const handleAddLocation = (event) => {
    event.preventDefault();

    const cityName = newLocation.city.trim();
    const stateName = newLocation.state.trim() || "Telangana";

    if (!cityName) {
      return;
    }

    const alreadyExists = [
      ...screenshotServiceAreas,
      ...customLocations,
    ].some(
      (area) =>
        area.city.trim().toLowerCase() ===
        cityName.toLowerCase()
    );

    if (alreadyExists) {
      window.alert(`${cityName} is already in Service Areas.`);
      return;
    }

    const locationToAdd = {
      city: cityName,
      district: stateName,
      location: `${cityName}, ${stateName}, India`,
      distance: "Service area available",
      localPrice: newLocation.startingPrice || "₹3,999",
      oneBHK: "₹6,999",
      twoBHK: "₹9,999",
      threeBHK: "₹12,999",
      office: "₹8,999",
      startingPrice: newLocation.startingPrice || "₹3,999",
      movingTime: newLocation.movingTime || "Same-day local support",
      areasCovered: "Service available",
      branch: false,
    };

    setCustomLocations((current) => [...current, locationToAdd]);
    setSearchCity("");
    setNewLocation({
      city: "",
      state: "Telangana",
      startingPrice: "₹3,999",
      movingTime: "Same-day local support",
    });
    setShowAddLocation(false);
  };

  const handleDeleteCustomLocation = (cityName) => {
    const confirmed = window.confirm(
      `Delete ${cityName} from your added Service Areas?`
    );

    if (!confirmed) {
      return;
    }

    setCustomLocations((current) =>
      current.filter(
        (area) =>
          area.city.trim().toLowerCase() !==
          cityName.trim().toLowerCase()
      )
    );

    if (
      selectedCity &&
      selectedCity.city.trim().toLowerCase() ===
        cityName.trim().toLowerCase()
    ) {
      setSelectedCity(null);
    }
  };

  const getCityDetails = (city) => {
    if (city.city === "Korutla") {
      return {
        ...city,
        district: "Telangana",
        location: "Korutla, Telangana, India",
        distance: "45 minutes from our Karimnagar base",
        localPrice: "₹3,999",
        oneBHK: "₹6,999",
        twoBHK: "₹9,999",
        threeBHK: "₹12,999",
        office: "₹9,999",
        startingPrice: "₹4,499",
        movingTime: "5–8 hours for a 2BHK, same-day completion",
        description:
          "Korutla is a trading town whose market yard drives constant commercial movement — trader families shifting homes, shops relocating, and agricultural business moves. Just 45 minutes from our Karimnagar base, Korutla gets full same-day service, and our weekly Hyderabad truck offers affordable shared-load options.",
        landmarks: [
          "Korutla Bus Stand",
          "Market Yard",
          "Metpally Road",
        ],
        challenges:
          "Market-yard area loading happens before 8 AM to avoid trader traffic. Multi-generation joint families here mean large 4–5BHK inventories that need full-day packing with 6-member crews.",
        testimonial:
          "Moved our shop and house together over one weekend. Business did not stop for a single day. Superb planning.",
        testimonialBy:
          "Raju Goud, Market Yard, Korutla",
        services: [
          ["Local Moving", "₹3,999"],
          ["Long-Distance Moving", "₹12,999"],
          ["Office Relocation", "₹9,999"],
          ["Packing & Unpacking", "₹2,499"],
          ["Car Transportation", "₹6,999"],
          ["Storage & Warehousing", "₹1,999/mo"],
          ["Loading & Unloading", "₹1,999"],
          ["Insurance Coverage", "3% of value"],
        ],
      };
    }

    return {
      ...city,
      startingPrice: city.localPrice || "₹3,999",
      movingTime: "Same-day local support or planned intercity relocation",
      description:
        `${city.city} is covered by Kiran Packers And Movers for household, office and commercial relocation requirements. Our team can coordinate packing, loading, transportation and unloading based on the size, distance and moving schedule.`,
      landmarks: [
        `${city.city} main area`,
        `${city.city} market / commercial zone`,
        `${city.city} transport route`,
      ],
      challenges:
        `Every move in ${city.city} is planned around road access, parking, building access, floor level and the quantity of goods. We coordinate pickup and delivery timing to make the relocation more organised.`,
      testimonial:
        `The team handled our shifting carefully and kept the move organised from packing to delivery.`,
      testimonialBy: `Kiran Packers And Movers customer, ${city.city}`,
      services: [
        ["Local Moving", city.localPrice || "₹3,999"],
        ["Long-Distance Moving", city.threeBHK || "₹12,999"],
        ["Office Relocation", city.office || "₹8,999"],
        ["Packing & Unpacking", "₹2,499"],
        ["Car Transportation", "₹6,999"],
        ["Storage & Warehousing", "₹1,999/mo"],
        ["Loading & Unloading", "₹1,999"],
        ["Insurance Coverage", "3% of value"],
      ],
    };
  };

  const guides = [
    {
      icon: "💰",
      category: "Cost Guide",
      time: "6 min",
      title:
        "How Much Do Packers and Movers Charge in Karimnagar? [2026 Price Guide]",
      text:
        "Realistic 2026 price guidance for 1BHK, 2BHK and 3BHK moves in Karimnagar — plus the factors that can change your quote and ways to avoid unexpected charges.",
    },
    {
      icon: "✅",
      category: "Checklists",
      time: "7 min",
      title:
        "Moving from Karimnagar to Hyderabad: Complete Checklist",
      text:
        "A practical checklist for Karimnagar–Hyderabad moves covering permissions, utility transfers, packing order and moving-day preparation.",
    },
    {
      icon: "📦",
      category: "Packing Tips",
      time: "5 min",
      title:
        "Top 10 Tips for Packing Fragile Items During Monsoon",
      text:
        "Simple packing tips to help protect glassware, electronics, décor and other fragile belongings during humid and rainy conditions.",
    },
  ];

  const faqs = [
    {
      q: "What types of shifting services are available?",
      a: "We provide household shifting, office relocation, packing and unpacking, local shifting, intercity relocation and vehicle transportation assistance.",
    },
    {
      q: "Do you provide packing services?",
      a: "Yes. Packing support can be arranged for household goods, furniture, electronics, kitchen items, documents and other belongings.",
    },
    {
      q: "Can I request a moving quotation?",
      a: "Yes. Use the Get Free Quote button and provide your basic moving details. Our team can then discuss your requirement.",
    },
    {
      q: "Do you provide local shifting in Karimnagar?",
      a: "Yes. Local relocation support is available for shifting requirements around Karimnagar and nearby areas.",
    },
    {
      q: "How can I contact Kiran Packers And Movers?",
      a: "You can call the listed number, use WhatsApp, or visit the Mukarampura location using the Google Maps button.",
    },
  ];

  useEffect(() => {
    try {
      localStorage.setItem(
        "kiranServiceAreaLocations",
        JSON.stringify(customLocations)
      );
    } catch (error) {
      console.error("Unable to save service areas.", error);
    }
  }, [customLocations]);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "#eef5ff";
    document.body.style.fontFamily =
      "Inter, Arial, Helvetica, sans-serif";
  }, []);

  const scrollToSection = (id) => {
    setMobileMenu(false);

    const element = document.getElementById(id);

    if (element) {
      const headerHeight =
        window.innerWidth <= 850 ? 72 : 94;

      window.scrollTo({
        top: element.offsetTop - headerHeight,
        behavior: "smooth",
      });
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Kiran Packers And Movers, I would like to know more about your packing and moving services."
    );

    window.open(
      `https://wa.me/${company.whatsapp}?text=${message}`,
      "_blank"
    );
  };

  const callNow = () => {
    window.location.href = `tel:${company.phone}`;
  };

  const openMaps = () => {
    window.open(company.maps, "_blank");
  };

  const openAdminPortal = () => {
    setMobileMenu(false);
    setShowAdminLogin(true);
  };

  const closeAdminPortal = () => {
    setShowAdminLogin(false);
    setShowAdminPassword(false);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (!adminEmail.trim() || !adminPassword.trim()) {
      alert("Please enter your email address and password.");
      return;
    }

    alert(
      "Admin authentication is not connected yet. Connect your secure backend authentication to enable dashboard login."
    );
  };

  const handleForgotPassword = () => {
    alert(
      "Please contact the system administrator to reset your admin password."
    );
  };

  const submitQuote = (e) => {
    e.preventDefault();

    alert(
      "Thank you for contacting Kiran Packers And Movers. Your enquiry has been submitted."
    );

    setShowQuote(false);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        a {
          text-decoration: none;
        }

        /* =========================
           MAIN
        ========================= */

        .app {
          min-height: 100vh;
          color: #17243b;
          background: linear-gradient(
            180deg,
            #eef5ff 0%,
            #ffffff 45%,
            #edf5fc 100%
          );
        }

        @keyframes totalBlink {
          0% {
            opacity: 1;
          }

          46% {
            opacity: 1;
          }

          50% {
            opacity: 0.72;
          }

          54% {
            opacity: 0.98;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes floatUp {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        .blink-text {
          animation: totalBlink 3.8s ease-in-out infinite;
        }

        .contact-card .blink-text {
          color: #ffffff;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.8s ease,
            transform 0.8s ease;
        }

        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        .container {
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
        }

        /* =========================
           TOP BAR
        ========================= */

        .topbar {
          background: #0B2A4A;
          color: #ffffff;
          min-height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7px 20px;
          font-size: 13px;
          letter-spacing: 0.3px;
          border-bottom: 1px solid
            rgba(217, 107, 39, 0.5);
        }

        .topbar-inner {
          width: min(1240px, 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .topbar span {
          opacity: 0.95;
        }

        .topbar strong {
          color: #E18443;
        }

        /* =========================
           HEADER / NAVBAR
        ========================= */

        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #061A30;
          border-bottom: 1px solid
            rgba(217, 107, 39, 0.45);
          box-shadow:
            0 8px 30px rgba(0, 0, 0, 0.18);
        }

        .nav {
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
          min-height: 94px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          min-width: max-content;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #D96B27 !important;
          border: 0 !important;
          color: #ffffff !important;
          font-size: 23px;
          font-weight: 900;
          box-shadow:
            0 6px 18px rgba(0, 0, 0, 0.2);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .logo-text strong {
          color: #ffffff;
          font-family: Georgia, serif;
          font-size: 20px;
          line-height: 1.1;
        }

        .logo-text span {
          color: #E18443;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav-links button {
          border: 0;
          background: transparent;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 0;
          transition: 0.25s;
        }

        .nav-links button:hover {
          color: #E18443;
        }

        .admin-nav-button {
          border: 1px solid rgba(255, 255, 255, 0.35) !important;
          background: rgba(255, 255, 255, 0.06) !important;
          color: #ffffff !important;
          padding: 11px 16px !important;
          border-radius: 8px;
          transition: 0.25s;
        }

        .admin-nav-button:hover {
          background: #D96B27 !important;
          border-color: #D96B27 !important;
          color: #ffffff !important;
          transform: translateY(-2px);
        }

        .admin-nav-button:active {
          transform: translateY(0);
        }

        .nav-quote {
          background: #D96B27 !important;
          color: #ffffff !important;
          padding: 12px 18px !important;
          border-radius: 8px;
          box-shadow:
            0 7px 18px rgba(217, 107, 39, 0.3);
        }

        .nav-quote:hover {
          background: #B9541E !important;
          color: #ffffff !important;
          transform: translateY(-2px);
        }

        .menu-button {
          display: none;
          width: 44px;
          height: 44px;
          border: 1px solid
            rgba(255, 255, 255, 0.3);
          background: #123D63;
          border-radius: 8px;
          font-size: 23px;
          cursor: pointer;
          color: #ffffff;
        }

        /* =========================
           HERO / HOMEPAGE
        ========================= */

        .hero {
          min-height: 485px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #061A30;
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          border: 80px solid
            rgba(255, 255, 255, 0.07);
          right: -190px;
          top: 40px;
        }

        .hero::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          left: -130px;
          bottom: -120px;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
          padding: 22px 0;
          text-align: left;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border: 1px solid
            rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .hero h1 {
          width: 100%;
          max-width: none;
          margin: 0;
          color: #ffffff;
          font-family: Georgia, serif;
          font-size: clamp(40px, 5vw, 64px);
          line-height: 1.08;
          letter-spacing: -1.5px;
          text-align: left;
          white-space: nowrap;
        }

        .hero h1 span {
          color: #E18443;
        }

        .hero p {
          width: 100%;
          max-width: none;
          color: #e7f1ff;
          font-size: 17px;
          line-height: 1.65;
          margin: 12px 0 0;
          text-align: left;
        }

        .hero-extra-matter {
          width: 100%;
          margin: 28px 0 22px;
        }

        .hero-extra-intro {
          width: 100%;
          padding: 20px 24px;
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
        }

        .hero-extra-label {
          margin-bottom: 7px;
          color: #ffb16f;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .hero-extra-intro h3 {
          margin: 0 0 8px;
          color: #ffffff;
          font-size: 21px;
        }

        .hero-extra-intro p {
          margin: 6px 0 0;
          max-width: 1150px;
          color: rgba(255, 255, 255, 0.86);
          font-size: 13.5px;
          line-height: 1.65;
        }

        .hero-extra-points {
          width: 100%;
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .hero-extra-point {
          min-height: 126px;
          padding: 16px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.075);
          border: 1px solid rgba(255, 255, 255, 0.14);
          display: flex;
          gap: 11px;
          align-items: flex-start;
        }

        .hero-extra-point > span {
          width: 39px;
          height: 39px;
          min-width: 39px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(245, 130, 32, 0.18);
          font-size: 20px;
        }

        .hero-extra-point strong {
          display: block;
          margin-bottom: 5px;
          color: #ffffff;
          font-size: 14px;
        }

        .hero-extra-point p {
          margin: 0;
          color: rgba(255, 255, 255, 0.76);
          font-size: 11.5px;
          line-height: 1.5;
        }

        .hero-bottom-matter {
          width: 100%;
          margin-top: 14px;
          padding: 14px 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          border-radius: 15px;
          background: rgba(0, 0, 0, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .hero-bottom-matter > div {
          padding: 3px 11px;
          border-right: 1px solid rgba(255, 255, 255, 0.14);
        }

        .hero-bottom-matter > div:last-child {
          border-right: 0;
        }

        .hero-bottom-matter strong {
          display: block;
          color: #ffffff;
          font-size: 12.5px;
          margin-bottom: 4px;
        }

        .hero-bottom-matter span {
          display: block;
          color: rgba(255, 255, 255, 0.68);
          font-size: 11px;
          line-height: 1.4;
        }

        .hero-highlights span {
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
        }

        .hero-actions {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 13px;
          flex-wrap: wrap;
          margin-top: 15px;
        }

        .btn {
          border: 0;
          cursor: pointer;
          border-radius: 8px;
          padding: 14px 21px;
          font-weight: 700;
          transition: 0.3s;
        }

        .btn-primary {
          background: #D96B27;
          color: #ffffff;
          box-shadow:
            0 10px 25px rgba(217, 107, 39, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          background: #B9541E;
        }

        .btn-light {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: 1px solid
            rgba(255, 255, 255, 0.35);
        }

        .btn-light:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.2);
        }

        .hero-contact {
          margin-top: 17px;
          display: flex;
          justify-content: flex-start;
          gap: 30px;
          flex-wrap: wrap;
        }

        .hero-contact-item {
          color: #e7f0fb;
          font-size: 14px;
          text-align: left;
        }

        .hero-contact-item strong {
          color: #E18443;
          display: block;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .hero-layout {
          position: relative;
          z-index: 2;
          width: min(1380px, calc(100% - 40px));
          margin: 0 auto;
          padding: 24px 0;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(420px, 0.92fr);
          gap: 34px;
          align-items: center;
        }

        .hero-layout .hero-content {
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .hero-quote-card {
          width: 100%;
          padding: 26px;
          border-radius: 22px;
          background: #f4f4f4;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
          color: #18283a;
        }

        .hero-quote-kicker {
          display: inline-flex;
          padding: 7px 11px;
          border-radius: 999px;
          background: #e18443;
          color: #ffffff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .hero-quote-card h2 {
          margin: 12px 0 5px;
          color: #10253b;
          font-family: Georgia, serif;
          font-size: clamp(28px, 3vw, 38px);
          line-height: 1.1;
        }

        .hero-quote-intro {
          margin: 0 0 15px;
          color: #607083;
          font-size: 13px;
          line-height: 1.55;
        }

        .hero-price-box {
          margin-bottom: 16px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #e9e9e9;
          border-left: 4px solid #d96b27;
        }

        .hero-price-box strong {
          display: block;
          color: #b9541e;
          font-size: 12px;
          letter-spacing: 0.4px;
        }

        .hero-price-box span {
          display: block;
          margin-top: 3px;
          color: #68798a;
          font-size: 11px;
        }

        .hero-quote-form {
          width: 100%;
        }

        .hero-quote-fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .hero-form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .hero-form-full {
          grid-column: 1 / -1;
        }

        .hero-form-group label {
          color: #23384c;
          font-size: 11px;
          font-weight: 800;
        }

        .hero-form-group input,
        .hero-form-group select,
        .hero-form-group textarea {
          width: 100%;
          border: 1px solid #d5dbe2;
          border-radius: 9px;
          background: #ffffff;
          color: #24374a;
          outline: none;
          font-size: 12px;
          padding: 10px 11px;
          transition: 0.2s ease;
        }

        .hero-form-group input,
        .hero-form-group select {
          min-height: 40px;
        }

        .hero-form-group textarea {
          min-height: 68px;
          resize: vertical;
        }

        .hero-form-group input:focus,
        .hero-form-group select:focus,
        .hero-form-group textarea:focus {
          border-color: #e18443;
          box-shadow: 0 0 0 3px rgba(225, 132, 67, 0.12);
        }

        .hero-quote-submit {
          width: 100%;
          margin-top: 14px;
          padding: 13px 18px;
          border: 0;
          border-radius: 10px;
          background: #d96b27;
          color: #ffffff;
          cursor: pointer;
          font-size: 13px;
          font-weight: 900;
          box-shadow: 0 10px 24px rgba(217, 107, 39, 0.22);
          transition: 0.25s ease;
        }

        .hero-quote-submit:hover {
          background: #b9541e;
          transform: translateY(-2px);
        }

        @media (max-width: 1050px) {
          .hero-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .hero-quote-card {
            max-width: 760px;
            margin: 0 auto;
          }
        }

        @media (max-width: 620px) {
          .hero-layout {
            width: min(100% - 24px, 1380px);
            padding: 18px 0 24px;
          }

          .hero h1 {
            white-space: normal;
            font-size: clamp(34px, 10vw, 48px);
          }

          .hero-quote-card {
            padding: 20px 16px;
            border-radius: 17px;
          }

          .hero-quote-fields {
            grid-template-columns: 1fr;
          }

          .hero-form-full {
            grid-column: auto;
          }
        }

        /* =========================
           TRUST
        ========================= */

        .trust-strip {
          background: #0B2A4A;
          color: #ffffff;
          padding: 14px 0;
        }

        .trust-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 20px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          padding: 8px 14px;
          border-right: 1px solid
            rgba(255, 255, 255, 0.13);
          text-align: left;
        }

        .trust-item:last-child {
          border-right: 0;
        }

        .trust-icon {
          font-size: 25px;
        }

        .trust-item strong {
          display: block;
          color: #E18443;
          font-size: 13px;
        }

        .trust-item span {
          display: block;
          color: #d8e6f5;
          font-size: 11px;
          margin-top: 3px;
        }

        /* =========================
           SECTIONS
        ========================= */

        .section {
          padding: 30px 0;
        }

        .section.alt {
          background: #edf5fd;
        }

        .section.faq-section {
          background: #dce8f3;
        }

        .section.services-section {
          background: #061A30;
        }

        .services-section .section-heading h2,
        .services-section .section-heading p {
          color: #ffffff;
        }

        .section.dark {
          background: #0B2A4A;
          color: #ffffff;
        }

        .section-heading {
          width: 100%;
          max-width: 780px;
          margin: 0 0 18px;
          text-align: left;
        }

        .eyebrow {
          color: #D96B27;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
          text-align: left;
        }

        .dark .eyebrow {
          color: #E18443;
        }

        .section-heading h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(34px, 4vw, 54px);
          line-height: 1.08;
          color: #0B2A4A;
          text-align: left;
        }

        .dark .section-heading h2 {
          color: #ffffff;
        }

        .section-heading p {
          color: #66768b;
          line-height: 1.75;
          margin: 9px 0 0;
          font-size: 16px;
          text-align: left;
        }

        .dark .section-heading p {
          color: #d2dfed;
        }

        /* =========================
           ABOUT
        ========================= */

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: stretch;
        }

        .about-image {
          height: 100%;
          min-height: 330px;
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #061A30 0%, #0B2A4A 55%, #122f4f 100%);
          border: 0;
          box-shadow: 0 20px 45px rgba(11, 42, 74, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kiran-about-animation {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .kiran-about-title {
          position: absolute;
          top: 28px;
          left: 28px;
          right: 28px;
          z-index: 5;
          color: #ffffff;
          text-align: center;
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-shadow: 0 4px 18px rgba(0,0,0,.35);
        }

        .kiran-about-subtitle {
          position: absolute;
          top: 78px;
          left: 20px;
          right: 20px;
          z-index: 5;
          color: #E18443;
          text-align: center;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .kiran-road {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 38%;
          min-height: 105px;
          background: #182333;
          border-top: 4px solid #E18443;
        }

        .kiran-road::after {
          content: "";
          position: absolute;
          left: -10%;
          right: -10%;
          top: 50%;
          height: 6px;
          background: repeating-linear-gradient(90deg, #f5f5f5 0 70px, transparent 70px 125px);
          animation: kiranRoad 1.1s linear infinite;
        }

        @keyframes kiranRoad {
          from { transform: translateX(0); }
          to { transform: translateX(-125px); }
        }

        .kiran-truck {
          position: absolute;
          z-index: 4;
          bottom: 22%;
          left: -280px;
          width: min(430px, 78%);
          animation: kiranTruckMove 7s linear infinite;
        }

        @keyframes kiranTruckMove {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(calc(100vw * 0.78 + 500px)); }
        }

        .kiran-truck-body {
          position: relative;
          height: 105px;
          border-radius: 10px 12px 8px 8px;
          background: linear-gradient(180deg, #F28A3D 0%, #D96B27 100%);
          border: 4px solid #ffffff;
          box-shadow: 0 12px 25px rgba(0,0,0,.28);
        }

        .kiran-truck-cabin {
          position: absolute;
          right: -88px;
          bottom: -4px;
          width: 100px;
          height: 82px;
          border-radius: 8px 14px 8px 8px;
          background: #E18443;
          border: 4px solid #ffffff;
        }

        .kiran-truck-window {
          position: absolute;
          right: 10px;
          top: 10px;
          width: 58px;
          height: 32px;
          border-radius: 5px;
          background: #08223c;
          border: 2px solid rgba(255,255,255,.8);
        }

        .kiran-truck-name {
          position: absolute;
          inset: 25px 15px auto 15px;
          color: #ffffff;
          font-size: clamp(15px, 2vw, 24px);
          font-weight: 900;
          text-align: center;
          letter-spacing: 1px;
          white-space: nowrap;
        }

        .kiran-wheel {
          position: absolute;
          bottom: -25px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #101820;
          border: 7px solid #394553;
          box-shadow: inset 0 0 0 5px #111820;
          animation: kiranWheel 0.45s linear infinite;
        }

        .kiran-wheel.one { left: 42px; }
        .kiran-wheel.two { right: -65px; }

        @keyframes kiranWheel {
          to { transform: rotate(360deg); }
        }

        .kiran-speed-line {
          position: absolute;
          height: 3px;
          background: rgba(255,255,255,.6);
          border-radius: 10px;
          animation: kiranSpeed 1.2s linear infinite;
        }

        .kiran-speed-line.one { width: 100px; left: 8%; bottom: 58%; }
        .kiran-speed-line.two { width: 150px; left: 18%; bottom: 48%; animation-delay: .25s; }
        .kiran-speed-line.three { width: 75px; left: 3%; bottom: 38%; animation-delay: .5s; }

        @keyframes kiranSpeed {
          0% { opacity: 0; transform: translateX(80px); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-170px); }
        }

        @media (max-width: 900px) {
          .kiran-truck {
            width: min(350px, 75%);
            animation-duration: 6.5s;
          }
        }

        @media (max-width: 600px) {
          .kiran-about-title { top: 22px; }
          .kiran-about-subtitle { top: 65px; }
          .kiran-truck { width: 270px; bottom: 24%; }
          .kiran-truck-body { height: 78px; }
          .kiran-truck-cabin { right: -68px; width: 78px; height: 62px; }
          .kiran-truck-window { width: 44px; height: 25px; }
          .kiran-truck-name { font-size: 14px; inset: 19px 8px auto 8px; }
          .kiran-wheel { width: 40px; height: 40px; bottom: -20px; border-width: 5px; }
          .kiran-wheel.one { left: 28px; }
          .kiran-wheel.two { right: -48px; }
        }

        .about-content {
          text-align: left;
        }

        .about-content h3 {
          color: #0B2A4A;
          font-family: Georgia, serif;
          font-size: 34px;
          line-height: 1.2;
          margin: 0 0 15px;
          text-align: left;
        }

        .about-content p {
          color: #5f6f84;
          line-height: 1.8;
          margin: 0 0 16px;
          text-align: left;
        }

        .about-points {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 18px;
        }

        .point {
          background: #ffffff;
          border: 1px solid #d5e4f3;
          padding: 15px;
          border-radius: 10px;
          color: #243b58;
          font-size: 13px;
          font-weight: 700;
          text-align: left;
          transition: 0.25s;
        }

        .point:hover {
          transform: translateY(-3px);
          border-color: #D96B27;
        }

        /* =========================
           SERVICES
        ========================= */

        .service-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 18px;
          align-items: stretch;
        }

        .service-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: #ffffff;
          border: 1px solid #d8e5f1;
          border-radius: 15px;
          padding: 18px;
          min-height: 195px;
          text-align: left;
          transition: 0.35s;
        }

        .service-card:hover {
          transform: translateY(-7px);
          border-color: #D96B27;
          box-shadow:
            0 18px 35px rgba(11, 42, 74, 0.12);
        }

        .service-icon {
          width: 55px;
          height: 55px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          background: #e7f1ff;
          border: 2px solid #c9ddf2;
          font-size: 26px;
          margin-bottom: 14px;
        }

        .service-card h3 {
          width: 100%;
          margin: 0 0 10px;
          color: #0B2A4A;
          font-family: Georgia, serif;
          font-size: 22px;
          line-height: 1.25;
          text-align: left;
        }

        .service-card p {
          width: 100%;
          margin: 0;
          color: #66768b;
          line-height: 1.65;
          font-size: 14px;
          text-align: left;
        }

        .service-link {
          margin-top: auto;
          padding-top: 17px;
          color: #D96B27;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          text-align: left;
        }

        .service-link:hover {
          color: #B9541E;
        }

        /* =========================
           ADVANTAGES
        ========================= */

        .advantage-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 18px;
          align-items: stretch;
        }

        .advantage-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 18px;
          background: #123D63;
          border-radius: 15px;
          border: 1px solid
            rgba(255, 255, 255, 0.14);
          text-align: left;
          transition: 0.3s;
        }

        .advantage-card:hover {
          transform: translateY(-6px);
          background: #174A73;
        }

        .advantage-icon {
          width: 53px;
          height: 53px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: rgba(217, 107, 39, 0.16);
          font-size: 27px;
          margin-bottom: 12px;
        }

        .advantage-card h3 {
          width: 100%;
          margin: 0 0 9px;
          color: #E18443;
          font-family: Georgia, serif;
          font-size: 20px;
          text-align: left;
        }

        .advantage-card p {
          width: 100%;
          color: #d3e1ef;
          line-height: 1.65;
          font-size: 13px;
          margin: 0;
          text-align: left;
        }

        /* =========================
           PROCESS
        ========================= */

        .process-grid {
          display: grid;
          grid-template-columns:
            repeat(5, 1fr);
          gap: 13px;
          align-items: stretch;
        }

        .process-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: #ffffff;
          border: 1px solid #d5e3f1;
          padding: 16px;
          border-radius: 14px;
          min-height: 175px;
          text-align: left;
          transition: 0.3s;
        }

        .process-card:hover {
          transform: translateY(-6px);
          border-color: #D96B27;
          box-shadow:
            0 15px 30px rgba(11, 42, 74, 0.1);
        }

        .process-number {
          color: #D96B27;
          font-size: 29px;
          font-family: Georgia, serif;
          font-weight: bold;
        }

        .process-card h3 {
          width: 100%;
          color: #0B2A4A;
          font-family: Georgia, serif;
          font-size: 19px;
          line-height: 1.3;
          margin: 12px 0 7px;
          text-align: left;
        }

        .process-card p {
          width: 100%;
          color: #69788c;
          font-size: 13px;
          line-height: 1.65;
          margin: 0;
          text-align: left;
        }

        /* =========================
           AREAS
        ========================= */

        .areas-grid {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .area-pill {
          padding: 9px 14px;
          background: #ffffff;
          border: 1px solid #d3e2f1;
          border-radius: 999px;
          color: #354a65;
          font-size: 13px;
          font-weight: 700;
          text-align: left;
          transition: 0.25s;
        }

        .area-pill:hover {
          background: #fff1e6;
          border-color: #D96B27;
          color: #B9541E;
          transform: translateY(-2px);
        }

        /* =========================
           JOURNAL
        ========================= */

        .journal-section {
          background: #f4f7fb;
        }

        .journal-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        .journal-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-height: 220px;
          padding: 18px;
          background: #ffffff;
          border: 1px solid #d7e3ef;
          border-radius: 16px;
          text-align: left;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .journal-card:hover {
          transform: translateY(-8px);
          border-color: #D96B27;
          box-shadow:
            0 20px 40px rgba(11, 42, 74, 0.12);
        }

        .journal-icon {
          width: 58px;
          height: 58px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: #edf5fd;
          border: 2px solid #d4e4f3;
          font-size: 27px;
          margin-bottom: 14px;
          animation: floatUp 3.5s ease-in-out infinite;
        }

        .journal-meta {
          color: #D96B27;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .journal-card h3 {
          margin: 0;
          color: #0B2A4A;
          font-family: Georgia, serif;
          font-size: 22px;
          line-height: 1.3;
          text-align: left;
        }

        .journal-card p {
          margin: 14px 0 0;
          color: #66768b;
          font-size: 14px;
          line-height: 1.7;
          text-align: left;
        }

        .journal-read {
          margin-top: auto;
          padding-top: 20px;
          border: 0;
          background: transparent;
          color: #D96B27;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          padding-left: 0;
          transition: 0.25s;
        }

        .journal-read:hover {
          color: #B9541E;
          transform: translateX(4px);
        }

        .journal-modal-meta {
          color: #D96B27;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .journal-modal-text {
          color: #5f6f84;
          line-height: 1.8;
          font-size: 15px;
          margin: 0 0 22px;
        }

        .journal-modal-note {
          padding: 16px;
          margin-bottom: 22px;
          border-left: 4px solid #D96B27;
          background: #f4f7fb;
          border-radius: 8px;
          color: #40536b;
          line-height: 1.7;
          font-size: 13px;
        }

        /* =========================
           CTA
        ========================= */

        .cta {
          background:
            radial-gradient(
              circle at 90% 20%,
              rgba(217, 107, 39, 0.45),
              transparent 28%
            ),
            linear-gradient(
              120deg,
              #071D36,
              #0B2A4A,
              #D96B27
            );

          color: #ffffff;
          padding: 32px 0;
          position: relative;
          overflow: hidden;
        }

        .cta-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
        }

        .cta-inner > div:first-child {
          text-align: left;
        }

        .cta h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(33px, 4vw, 54px);
          line-height: 1.1;
          text-align: left;
        }

        .cta p {
          max-width: 650px;
          color: #e7f1ff;
          line-height: 1.7;
          margin: 14px 0 0;
          text-align: left;
        }

        .cta-actions {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* =========================
           FAQ
        ========================= */

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          align-items: stretch;
        }

        .faq-item {
          background: #ffffff;
          border: 1px solid #d7e4f0;
          border-radius: 13px;
          padding: 16px;
          text-align: left;
          transition: 0.3s;
        }

        .faq-item:hover {
          border-color: #D96B27;
          box-shadow:
            0 12px 25px rgba(11, 42, 74, 0.08);
        }

        .faq-item h3 {
          margin: 0 0 9px;
          color: #0B2A4A;
          font-family: Georgia, serif;
          font-size: 18px;
          line-height: 1.4;
          text-align: left;
        }

        .faq-item p {
          margin: 0;
          color: #66768b;
          line-height: 1.7;
          font-size: 13px;
          text-align: left;
        }

        /* =========================
           CONTACT
        ========================= */

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 28px;
          align-items: stretch;
        }

        .contact-card {
          background: #061A30;
          border-radius: 18px;
          padding: 22px;
          color: #ffffff;
          text-align: left;
        }

        .contact-card h2 {
          font-family: Georgia, serif;
          font-size: 34px;
          line-height: 1.2;
          margin: 0 0 12px;
          text-align: left;
        }

        .contact-card > p {
          color: #d1dfed;
          line-height: 1.7;
          text-align: left;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 13px;
          margin-top: 15px;
          text-align: left;
        }

        .contact-item-icon {
          width: 39px;
          height: 39px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          background: rgba(217, 107, 39, 0.18);
          color: #E18443;
          flex-shrink: 0;
        }

        .contact-item strong {
          display: block;
          color: #E18443;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .contact-item span {
          display: block;
          color: #e0e9f2;
          line-height: 1.55;
          font-size: 13px;
        }

        .contact-actions {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        /* =========================
           FULL GOOGLE MAP
        ========================= */

        .map-card {
          min-height: 320px;
          height: 100%;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          border: 1px solid #cbddec;
          background: #ffffff;
        }

        .map-card iframe {
          width: 100%;
          height: 100%;
          min-height: 320px;
          border: 0;
          display: block;
        }

        /* =========================
           FOOTER
        ========================= */

        .footer {
          background: #061A30;
          color: #c8d6e5;
          padding: 28px 0 18px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns:
            1.35fr 0.9fr 1.05fr 1.15fr;
          gap: 28px;
          padding-bottom: 18px;
          border-bottom: 1px solid
            rgba(255,255,255,0.1);
          text-align: left;
        }

        .footer h3 {
          color: #E18443;
          font-family: Georgia, serif;
          margin: 0 0 13px;
          font-size: 21px;
          text-align: left;
        }

        .footer p {
          line-height: 1.7;
          font-size: 13px;
          margin: 0;
          text-align: left;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 9px;
          text-align: left;
        }

        .footer-links button {
          border: 0;
          background: transparent;
          text-align: left;
          color: #c9d8e8;
          padding: 0;
          cursor: pointer;
          font-size: 13px;
        }

        .footer-links button:hover {
          color: #E18443;
        }

        .astroidea {
          color: #E18443;
          font-weight: 800;
        }

        .footer-bottom {
          padding-top: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 12px;
          text-align: left;
        }

        /* =========================
           FLOATING BUTTONS
        ========================= */

        .floating-buttons {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 1200;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .floating-button {
          width: 51px;
          height: 51px;
          border: 0;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 22px;
          box-shadow:
            0 10px 25px rgba(0,0,0,0.18);
          transition: 0.3s;
        }

        .floating-button:hover {
          transform: translateY(-4px);
        }

        .float-call {
          background: #0B2A4A;
          color: #ffffff;
        }

        .float-whatsapp {
          background: #D96B27;
          color: #ffffff;
        }

        /* =========================
           MODAL
        ========================= */

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(3, 20, 43, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(7px);
        }

        .modal {
          width: min(650px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          background: #ffffff;
          border-radius: 18px;
          border: 2px solid #D96B27;
          padding: 30px;
          text-align: left;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 23px;
        }

        .modal-header h2 {
          margin: 0;
          color: #0B2A4A;
          font-family: Georgia, serif;
          font-size: 32px;
          line-height: 1.2;
          text-align: left;
        }

        .modal-header p {
          margin: 7px 0 0;
          color: #697486;
          font-size: 13px;
          text-align: left;
        }

        .close-button {
          width: 37px;
          height: 37px;
          border-radius: 50%;
          border: 1px solid #cbddec;
          background: #edf5fd;
          color: #0B2A4A;
          cursor: pointer;
          font-size: 18px;
          flex-shrink: 0;
        }

        .close-button:hover {
          background: #fff0e5;
          color: #D96B27;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 7px;
          text-align: left;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-group label {
          color: #34445a;
          font-size: 12px;
          font-weight: 800;
          text-align: left;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          border: 1px solid #cbddec;
          background: #ffffff;
          color: #25354c;
          border-radius: 8px;
          padding: 12px 13px;
          outline: none;
          text-align: left;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #D96B27;
          box-shadow:
            0 0 0 3px rgba(217, 107, 39, 0.1);
        }

        .form-group textarea {
          min-height: 105px;
          resize: vertical;
        }

        .form-submit {
          width: 100%;
          margin-top: 17px;
        }

        /* =========================
           ADMIN LOGIN PORTAL
        ========================= */

        .admin-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(3, 15, 31, 0.78);
          backdrop-filter: blur(8px);
        }

        .admin-modal {
          width: min(470px, 100%);
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(217, 107, 39, 0.22);
          border-radius: 24px;
          padding: 34px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
        }

        .admin-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 50%;
          background: #eef3f8;
          color: #061A30;
          font-size: 20px;
          cursor: pointer;
        }

        .admin-close:hover {
          background: #D96B27;
          color: #ffffff;
        }

        .admin-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .admin-brand-icon {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #D96B27 !important;
          border: 0 !important;
          color: #ffffff !important;
          font-size: 25px;
          font-weight: 900;
          font-weight: 900;
          box-shadow: 0 8px 20px rgba(217, 107, 39, 0.25);
        }

        .admin-kicker {
          color: #D96B27;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .admin-brand-title {
          color: #061A30;
          font-size: 16px;
          font-weight: 800;
        }

        .admin-modal h2 {
          margin: 0;
          color: #061A30;
          font-size: 30px;
          line-height: 1.15;
        }

        .admin-subtitle {
          margin: 10px 0 25px;
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
        }

        .admin-field {
          margin-bottom: 17px;
        }

        .admin-field label {
          display: block;
          margin-bottom: 7px;
          color: #24364d;
          font-size: 13px;
          font-weight: 800;
        }

        .admin-input-wrap {
          position: relative;
        }

        .admin-input,
        .admin-select {
          width: 100%;
          min-height: 48px;
          border: 1px solid #d7e0e9;
          border-radius: 10px;
          outline: none;
          background: #f8fafc;
          color: #17243b;
          padding: 12px 14px;
          transition: 0.2s;
        }

        .admin-input:focus,
        .admin-select:focus {
          border-color: #D96B27;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(217, 107, 39, 0.11);
        }

        .admin-input[type="password"],
        .admin-input.has-eye {
          padding-right: 48px;
        }

        .admin-eye {
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border: 0;
          background: transparent;
          color: #52677d;
          cursor: pointer;
          border-radius: 8px;
        }

        .admin-eye:hover {
          background: #eef3f8;
          color: #D96B27;
        }

        .admin-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin: 4px 0 22px;
        }

        .remember-device {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #5d6f82;
          font-size: 13px;
          cursor: pointer;
        }

        .remember-device input {
          width: 16px;
          height: 16px;
          accent-color: #D96B27;
        }

        .forgot-password {
          border: 0;
          background: transparent;
          color: #D96B27;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          padding: 4px 0;
        }

        .forgot-password:hover {
          color: #B9541E;
          text-decoration: underline;
        }

        .admin-login-submit {
          width: 100%;
          min-height: 50px;
          border: 0;
          border-radius: 10px;
          background: #D96B27;
          color: #ffffff;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 1px;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(217, 107, 39, 0.25);
          transition: 0.25s;
        }

        .admin-login-submit:hover {
          background: #B9541E;
          transform: translateY(-2px);
        }

        .admin-security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 17px;
          color: #718096;
          font-size: 11px;
          text-align: center;
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 1050px) {

          .nav-links {
            gap: 16px;
          }

          .nav-links button {
            font-size: 13px;
          }

          .service-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .advantage-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .process-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .journal-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 850px) {

          .topbar {
            display: none;
          }

          .nav {
            min-height: 72px;
          }

          .nav-links {
            display: none;
            position: absolute;
            top: 72px;
            left: 0;
            width: 100%;
            background: #061A30;
            padding: 18px 20px 25px;
            border-bottom: 1px solid
              rgba(217, 107, 39, 0.45);
            box-shadow:
              0 18px 30px rgba(0, 0, 0, 0.2);
            flex-direction: column;
            align-items: stretch;
          }

          .nav-links.mobile-open {
            display: flex;
          }

          .nav-links button {
            color: #ffffff;
            text-align: left;
            padding: 12px 0;
          }

          .nav-links button:hover {
            color: #E18443;
          }

          .admin-nav-button {
            text-align: left !important;
            padding: 12px 0 !important;
            border: 0 !important;
            background: transparent !important;
          }

          .admin-nav-button:hover {
            background: transparent !important;
            transform: none;
          }

          .nav-quote {
            text-align: center !important;
          }

          .menu-button {
            display: block;
          }

          .hero {
            min-height: auto;
          }

          .hero-content {
            padding: 22px 0;
          }

          .about-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .about-image {
            min-height: 320px;
          }

          .trust-grid {
            grid-template-columns: 1fr 1fr;
          }

          .trust-item {
            border-right: 0;
          }

          .cta-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }

          .map-card {
            min-height: 320px;
          }

          .map-card iframe {
            min-height: 320px;
          }

        }

        @media (max-width: 600px) {
          .hero h1 {
            white-space: normal;
          }

          .hero-extra-matter {
            margin: 18px 0 20px;
          }

          .hero-extra-intro {
            padding: 18px;
          }

          .hero-extra-intro h3 {
            font-size: 20px;
          }

          .hero-extra-intro p {
            font-size: 13px;
            line-height: 1.6;
          }

          .hero-extra-points {
            grid-template-columns: 1fr;
          }

          .hero-extra-point {
            min-height: auto;
          }

          .hero-bottom-matter {
            grid-template-columns: 1fr;
          }

          .hero-bottom-matter > div {
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            padding: 9px 4px;
          }

          .hero-bottom-matter > div:last-child {
            border-bottom: 0;
          }



          .container,
          .nav,
          .hero-content {
            width: min(100% - 28px, 1240px);
          }

          .hero h1 {
            font-size: 46px;
            letter-spacing: -1px;
          }

          .hero p {
            font-size: 15px;
          }

          .section {
            padding: 26px 0;
          }

          .service-grid,
          .advantage-grid,
          .process-grid,
          .trust-grid,
          .journal-grid {
            grid-template-columns: 1fr;
          }

          .about-points {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full {
            grid-column: auto;
          }

          .footer-bottom {
            align-items: flex-start;
            flex-direction: column;
          }

          .floating-buttons {
            right: 12px;
            bottom: 12px;
          }

          .floating-button {
            width: 47px;
            height: 47px;
          }

          .modal {
            padding: 18px;
          }

          .hero-actions {
            align-items: stretch;
          }

          .hero-actions .btn {
            width: 100%;
          }

          .home-location-button {
            width: 100%;
          }

          .hero-contact {
            gap: 18px;
          }

        }

        @media (max-width: 1100px) {

          .sa-cities-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

        }

        @media (max-width: 760px) {

          .sa-services-page {
            padding: 24px 16px 30px;
          }

          .sa-cities-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .sa-city-card {
            min-height: 230px;
            padding: 18px;
          }

          .sa-city-card h2 {
            font-size: 21px;
          }

        }

        @media (max-width: 520px) {

          .sa-cities-grid {
            grid-template-columns: 1fr;
          }

          .sa-city-card {
            min-height: 0;
          }

          .sa-location {
            min-height: 0;
          }

        }

        /* =====================================================
           FINAL RESPONSIVE SCREEN-FIT OVERRIDES
           Desktop + Tablet + Mobile
        ===================================================== */

        html,
        body,
        #root {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .app {
          width: 100%;
          min-height: 100vh;
          overflow-x: clip;
        }

        img,
        iframe,
        video,
        svg {
          max-width: 100%;
        }

        button,
        input,
        select,
        textarea {
          max-width: 100%;
          font: inherit;
        }

        .container,
        .nav,
        .hero-content {
          width: min(1240px, calc(100% - 32px));
        }

        .hero {
          min-height: calc(100vh - 132px);
          max-height: 760px;
        }

        .hero-content {
          padding-top: 34px;
          padding-bottom: 34px;
        }

        .hero h1 {
          font-size: clamp(42px, 4.5vw, 62px);
          white-space: normal;
        }

        .section {
          padding: clamp(42px, 5vw, 68px) 0;
        }

        .section-heading {
          margin-bottom: 28px;
        }

        .service-card,
        .advantage-card,
        .process-card,
        .journal-card,
        .contact-card,
        .map-card,
        .about-content,
        .about-image {
          min-width: 0;
        }

        .service-card p,
        .advantage-card p,
        .process-card p,
        .journal-card p,
        .contact-card p,
        .about-content p {
          overflow-wrap: anywhere;
        }

        .map-card {
          width: 100%;
          overflow: hidden;
        }

        .map-card iframe {
          width: 100%;
          display: block;
          border: 0;
        }

        .sa-services-page,
        .sa-modal,
        .modal,
        .quote-modal,
        .admin-modal {
          max-width: calc(100vw - 24px);
        }

        .sa-cities-grid,
        .service-grid,
        .advantage-grid,
        .process-grid,
        .journal-grid,
        .footer-grid,
        .about-grid,
        .contact-grid,
        .faq-grid {
          width: 100%;
        }

        @media (min-width: 1101px) {
          .nav {
            min-height: 82px;
          }

          .hero-content {
            padding-top: 38px;
            padding-bottom: 38px;
          }

          .hero-extra-matter {
            margin-top: 22px;
            margin-bottom: 18px;
          }

          .section {
            padding-top: 52px;
            padding-bottom: 52px;
          }
        }

        @media (max-width: 1050px) {
          .hero {
            min-height: auto;
            max-height: none;
          }

          .hero h1 {
            font-size: clamp(38px, 6vw, 54px);
          }

          .hero-extra-points {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hero-bottom-matter {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hero-bottom-matter > div:nth-child(2) {
            border-right: 0;
          }

          .hero-bottom-matter > div:nth-child(-n + 2) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          }
        }

        @media (max-width: 850px) {
          .container,
          .nav,
          .hero-content {
            width: calc(100% - 28px);
          }

          .header {
            position: sticky;
          }

          .nav {
            min-height: 70px;
          }

          .hero {
            min-height: auto;
            max-height: none;
          }

          .hero-content {
            padding: 30px 0 34px;
          }

          .hero h1 {
            font-size: clamp(38px, 8vw, 54px);
            line-height: 1.08;
          }

          .hero-extra-points {
            grid-template-columns: 1fr 1fr;
          }

          .hero-contact {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .contact-grid,
          .about-grid {
            gap: 24px;
          }

          .footer-grid {
            gap: 24px;
          }
        }

        @media (max-width: 600px) {
          .container,
          .nav,
          .hero-content {
            width: calc(100% - 24px);
          }

          .nav {
            gap: 10px;
          }

          .logo {
            gap: 8px;
            min-width: 0;
          }

          .logo-text strong {
            font-size: 15px;
          }

          .logo-text span {
            font-size: 10px;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
            min-width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .hero-content {
            padding: 24px 0 30px;
          }

          .hero-badge {
            max-width: 100%;
            font-size: 10px;
            padding: 8px 11px;
            letter-spacing: 0.7px;
          }

          .hero h1 {
            font-size: clamp(34px, 10.5vw, 46px);
            letter-spacing: -0.8px;
          }

          .hero p {
            font-size: 14px;
            line-height: 1.55;
          }

          .hero-extra-matter {
            margin: 16px 0;
          }

          .hero-extra-intro {
            padding: 16px;
          }

          .hero-extra-intro h3 {
            font-size: 18px;
            line-height: 1.3;
          }

          .hero-extra-intro p {
            font-size: 12.5px;
          }

          .hero-extra-points,
          .hero-bottom-matter,
          .hero-contact {
            grid-template-columns: 1fr;
          }

          .hero-bottom-matter > div,
          .hero-bottom-matter > div:nth-child(2) {
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          }

          .hero-bottom-matter > div:last-child {
            border-bottom: 0;
          }

          .hero-actions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .hero-actions .btn,
          .contact-actions .btn {
            width: 100%;
            min-height: 48px;
          }

          .hero-contact-item {
            font-size: 13px;
          }

          .section {
            padding: 38px 0;
          }

          .section-heading h2 {
            font-size: clamp(28px, 8vw, 38px);
            line-height: 1.15;
          }

          .section-heading p {
            font-size: 14px;
            line-height: 1.6;
          }

          .trust-strip {
            padding: 12px 0;
          }

          .trust-grid {
            gap: 8px;
          }

          .trust-item {
            padding: 8px 4px;
          }

          .trust-icon {
            font-size: 21px;
          }

          .trust-item strong {
            font-size: 11px;
          }

          .trust-item span {
            font-size: 10px;
          }

          .about-image {
            min-height: 240px;
          }

          .map-card,
          .map-card iframe {
            min-height: 280px;
            height: 280px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .sa-search-input,
          .sa-location-button,
          .sa-add-location-button {
            width: 100%;
            max-width: 100%;
          }

          .sa-price-table-wrap {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .sa-price-table {
            min-width: 600px;
          }

          .admin-modal,
          .modal,
          .quote-modal {
            width: calc(100vw - 20px) !important;
            max-height: calc(100vh - 20px);
            overflow-y: auto;
            padding: 18px !important;
          }

          .modal-header {
            gap: 10px;
          }

          .modal-header h2 {
            font-size: 23px;
            line-height: 1.2;
          }

          input,
          select,
          textarea {
            font-size: 16px !important;
          }
        }

        @media (max-width: 380px) {
          .container,
          .nav,
          .hero-content {
            width: calc(100% - 18px);
          }

          .hero h1 {
            font-size: 32px;
          }

          .hero-extra-intro {
            padding: 14px;
          }

          .service-card,
          .advantage-card,
          .process-card {
            padding: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {

          html {
            scroll-behavior: auto;
          }

          .reveal {
            opacity: 1;
            transform: none;
          }

          .blink-text {
            animation: none;
          }

          .journal-icon {
            animation: none;
          }

        }

        /* ================= SERVICE AREAS ONLY ================= */
        .home-location-button {
          min-width: 165px;
        }

        .home-location-message {
          margin-top: 13px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          line-height: 1.5;
        }

        .home-location-message span {
          font-weight: 700;
        }

        .sa-areas-section {
          padding: 0 !important;
        }

        .sa-services-page {
          min-height: 100vh;
          padding: 42px 20px 55px;
          background: #fffaf4;
        }

        .sa-services-container {
          width: min(1180px, 100%);
          margin: 0 auto;
        }

        .sa-heading {
          width: 100%;
          margin: 0 0 34px;
          text-align: left;
        }

        .sa-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 17px;
          margin-bottom: 0;
          border-radius: 50px;
          background: #fff0e3;
          color: #e87516;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0;
        }

        .sa-heading h1 {
          margin: 0;
          color: #10294b;
          font-family:
            Inter,
            Arial,
            Helvetica,
            sans-serif;
          font-size: 32px;
          line-height: 1.2;
          font-weight: 800;
        }

        .sa-heading p {
          width: 100%;
          margin: 0 0 20px;
          color: #5c708d;
          font-size: 20px;
          font-weight: 400;
          line-height: 1.5;
          text-align: left;
        }

        .sa-location-access {
          display: none;
        }

        .sa-search-area {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 28px;
          width: 100%;
        }

        .sa-search-box {
          position: relative;
          flex: 1;
        }

        .sa-search-input {
          width: 100%;
          box-sizing: border-box;
          min-height: 58px;
          padding: 0 20px 0 52px;
          border: 1px solid #dfe4ea;
          border-radius: 18px;
          background: #ffffff;
          color: #10294b;
          font-family: Inter, Arial, Helvetica, sans-serif;
          font-size: 17px;
          outline: none;
          box-shadow: 0 8px 22px rgba(23, 55, 95, 0.06);
        }

        .sa-search-input:focus {
          border-color: #D96B27;
          box-shadow: 0 10px 26px rgba(217, 107, 39, 0.12);
        }

        .sa-search-icon {
          position: absolute;
          top: 50%;
          left: 18px;
          transform: translateY(-50%);
          color: #74849a;
          font-size: 21px;
          pointer-events: none;
        }

        .sa-add-location-button {
          min-height: 58px;
          padding: 0 20px;
          border: 0;
          border-radius: 18px;
          background: #D96B27;
          color: #ffffff;
          font-family: Inter, Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 9px 20px rgba(217, 107, 39, 0.18);
        }

        .sa-add-location-button:hover {
          transform: translateY(-2px);
          background: #c65e20;
        }

        .sa-search-count {
          margin: -13px 0 24px;
          color: #7a899b;
          font-size: 14px;
          line-height: 1.4;
        }

        .sa-add-location-overlay {
          position: fixed;
          inset: 0;
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(6, 26, 48, 0.72);
          backdrop-filter: blur(6px);
        }

        .sa-add-location-modal {
          width: min(520px, 100%);
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          padding: 30px;
          border-radius: 26px;
          background: #ffffff;
          box-shadow: 0 25px 70px rgba(6, 26, 48, 0.28);
        }

        .sa-add-location-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 24px;
        }

        .sa-add-location-header h2 {
          margin: 0 0 7px;
          color: #10294b;
          font-size: 27px;
          line-height: 1.2;
        }

        .sa-add-location-header p {
          margin: 0;
          color: #708198;
          font-size: 14px;
          line-height: 1.5;
        }

        .sa-add-location-close {
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          border: 0;
          border-radius: 50%;
          background: #f0f3f6;
          color: #10294b;
          font-size: 25px;
          cursor: pointer;
        }

        .sa-add-location-form {
          display: grid;
          gap: 16px;
        }

        .sa-form-field {
          display: grid;
          gap: 7px;
        }

        .sa-form-field label {
          color: #193b67;
          font-size: 14px;
          font-weight: 800;
        }

        .sa-form-field input {
          width: 100%;
          box-sizing: border-box;
          min-height: 50px;
          padding: 0 14px;
          border: 1px solid #dfe4ea;
          border-radius: 13px;
          color: #10294b;
          font-family: Inter, Arial, Helvetica, sans-serif;
          font-size: 15px;
          outline: none;
        }

        .sa-form-field input:focus {
          border-color: #D96B27;
        }

        .sa-add-location-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 7px;
        }

        .sa-add-cancel,
        .sa-add-submit {
          min-height: 48px;
          padding: 0 18px;
          border-radius: 13px;
          font-family: Inter, Arial, Helvetica, sans-serif;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
        }

        .sa-add-cancel {
          border: 1px solid #dfe4ea;
          background: #ffffff;
          color: #193b67;
        }

        .sa-add-submit {
          border: 0;
          background: #D96B27;
          color: #ffffff;
        }

        .sa-cities-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          align-items: stretch;
        }

        .sa-city-card {
          position: relative;
          width: 100%;
          min-height: 158px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 30px 32px;
          border: 1px solid #e9e7e3;
          border-radius: 27px;
          background: #ffffff;
          cursor: pointer;
          box-shadow:
            0 9px 25px rgba(23, 55, 95, 0.08);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
          text-align: left;
        }

        .sa-city-card:hover {
          transform: translateY(-3px);
          border-color: #d9dee5;
          box-shadow:
            0 15px 32px rgba(23, 55, 95, 0.13);
        }

        .sa-city-card::after {
          display: none;
        }

        .sa-city-icon {
          display: none;
        }

        .sa-city-card h2 {
          margin: 0;
          padding-right: 42px;
          color: #10294b;
          font-family:
            Inter,
            Arial,
            Helvetica,
            sans-serif;
          font-size: 28px;
          line-height: 1.25;
          font-weight: 800;
          letter-spacing: -0.4px;
        }

        .sa-district,
        .sa-location {
          display: none;
        }

        .sa-card-divider {
          display: none;
        }

        .sa-starting-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 19px;
          min-height: 32px;
        }

        .sa-starting-label {
          display: none;
        }

        .sa-starting-price {
          display: none;
        }

        .sa-city-card::before {
          content: "↗";
          position: absolute;
          top: 31px;
          right: 32px;
          color: #9aa8b9;
          font-size: 28px;
          line-height: 1;
          font-weight: 300;
        }

        .sa-city-card .sa-starting-row::before {
          content: "";
          display: block;
        }

        .sa-city-card .sa-view-price {
          position: absolute;
          left: 32px;
          bottom: 30px;
          display: none;
        }

        .sa-branch-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 13px;
          border-radius: 18px;
          background: #e1e9f4;
          color: #193b67;
          font-size: 17px;
          line-height: 1;
          font-weight: 600;
        }

        .sa-areas-covered {
          color: #8a99ad;
          font-size: 17px;
          line-height: 1.4;
        }

        .sa-no-results {
          padding: 35px;
          background: #ffffff;
          border: 1px solid #e9e7e3;
          border-radius: 25px;
          text-align: center;
          color: #5c708d;
        }

        @media (max-width: 980px) and (min-width: 621px) {
          .sa-cities-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 620px) {
          .sa-cities-grid {
            grid-template-columns: 1fr;
          }

          .sa-search-area {
            flex-direction: column;
            align-items: stretch;
          }

          .sa-add-location-button {
            width: 100%;
          }

          .sa-add-location-modal {
            padding: 24px 20px;
            border-radius: 22px;
          }

          .sa-add-location-actions {
            flex-direction: column-reverse;
          }

          .sa-add-cancel,
          .sa-add-submit {
            width: 100%;
          }
        }

        .sa-delete-location-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          margin-top: 12px;
          padding: 8px 12px;
          border: 0;
          border-radius: 10px;
          background: #ffe7e3;
          color: #c83d2f;
          font-family: inherit;
          font-size: 13px;
          line-height: 1;
          font-weight: 800;
          cursor: pointer;
          position: relative;
          z-index: 6;
        }

        .sa-delete-location-button:hover {
          background: #ffd5cf;
        }

        .sa-delete-location-button:active {
          transform: translateY(1px);
        }

        .sa-city-card:focus-visible {
          outline: 3px solid rgba(217, 107, 39, 0.35);
          outline-offset: 3px;
        }

        /* Mobile service-area sizing to match the reference screenshot. */
        @media (max-width: 620px) {
          .sa-services-page {
            padding: 42px 27px 55px;
          }

          .sa-services-container {
            width: 100%;
          }

          .sa-heading {
            margin-bottom: 34px;
          }

          .sa-heading h1 {
            font-size: 29px;
          }

          .sa-heading p {
            font-size: 22px;
          }

          .sa-cities-grid {
            gap: 27px;
          }

          .sa-city-card {
            min-height: 158px;
            padding: 36px 32px;
            border-radius: 27px;
          }

          .sa-city-card h2 {
            font-size: 27px;
          }

          .sa-city-card::before {
            top: 37px;
            right: 31px;
            font-size: 27px;
          }

          .sa-starting-row {
            margin-top: 19px;
          }

          .sa-branch-badge {
            font-size: 16px;
          }

          .sa-areas-covered {
            font-size: 16px;
          }
        }

        @media (min-width: 621px) {
          .sa-services-page {
            padding-left: 32px;
            padding-right: 32px;
          }
        }

        /* ===== SERVICE AREA CITY LIST + LOCATION PAGE ===== */
        .sa-eyebrow {
          margin-bottom: 10px;
          color: #D96B27;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1.7px;
        }

        .sa-heading h1 {
          margin: 0 0 12px;
          color: #10294b;
          font-size: 36px;
          font-weight: 850;
        }

        .sa-heading p {
          max-width: 760px;
          margin: 0;
          color: #60718a;
          font-size: 17px;
          line-height: 1.65;
        }

        .sa-cities-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .sa-city-card {
          position: relative;
          min-height: 150px;
          width: 100%;
          padding: 24px;
          border: 1px solid #e1e7ee;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 8px 24px rgba(20, 48, 80, 0.07);
          cursor: pointer;
          text-align: left;
          display: flex;
          align-items: flex-start;
          gap: 15px;
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
          font: inherit;
        }

        .sa-city-card:hover {
          transform: translateY(-4px);
          border-color: #D96B27;
          box-shadow: 0 15px 30px rgba(20, 48, 80, 0.12);
        }

        .sa-city-icon {
          width: 43px;
          height: 43px;
          flex: 0 0 43px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: #fff0e5;
          font-size: 19px;
        }

        .sa-city-card-content {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding-right: 25px;
        }

        .sa-city-card-title {
          color: #10294b;
          font-size: 20px;
          line-height: 1.2;
          font-weight: 850;
        }

        .sa-city-card-subtitle {
          color: #8290a2;
          font-size: 13px;
          font-weight: 600;
        }

        .sa-city-arrow {
          position: absolute;
          top: 22px;
          right: 22px;
          color: #9aa8b9;
          font-size: 23px;
        }

        .sa-location-page {
          min-height: 100vh;
          padding: 32px 20px 65px;
          background: #f7f9fc;
        }

        .sa-location-container {
          width: min(1180px, 100%);
          margin: 0 auto;
        }

        .sa-back-button {
          border: 0;
          background: transparent;
          color: #D96B27;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          padding: 4px 0 18px;
        }

        .sa-breadcrumb {
          margin-bottom: 22px;
          color: #7b8898;
          font-size: 13px;
        }

        .sa-breadcrumb span {
          margin: 0 8px;
          color: #b5bec9;
        }

        .sa-location-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(300px, .75fr);
          gap: 30px;
          padding: 40px;
          border-radius: 26px;
          background: linear-gradient(135deg, #061A30, #0B2A4A);
          color: #ffffff;
          box-shadow: 0 18px 40px rgba(6, 26, 48, .18);
        }

        .sa-location-state {
          display: inline-block;
          margin-bottom: 12px;
          color: #E18443;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .sa-location-hero h1 {
          margin: 0 0 17px;
          color: #ffffff;
          font-size: clamp(34px, 5vw, 54px);
          line-height: 1.06;
          letter-spacing: -1.2px;
        }

        .sa-location-lead {
          margin: 0;
          max-width: 760px;
          color: rgba(255,255,255,.86);
          font-size: 16px;
          line-height: 1.7;
        }

        .sa-location-lead strong {
          color: #ffb16f;
        }

        .sa-location-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .btn-dark-outline {
          border: 1px solid rgba(255,255,255,.35) !important;
          background: transparent !important;
          color: #ffffff !important;
        }

        .sa-location-summary {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 19px;
          background: rgba(255,255,255,.06);
        }

        .sa-location-summary div {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 17px 20px;
          border-bottom: 1px solid rgba(255,255,255,.09);
        }

        .sa-location-summary div:last-child {
          border-bottom: 0;
        }

        .sa-location-summary span {
          color: rgba(255,255,255,.62);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .sa-location-summary strong {
          color: #ffffff;
          font-size: 15px;
          line-height: 1.4;
        }

        .sa-location-content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(360px, .8fr);
          gap: 28px;
          margin-top: 28px;
        }

        .sa-location-section {
          margin-bottom: 28px;
          padding: 28px;
          border: 1px solid #e4e9ef;
          border-radius: 20px;
          background: #ffffff;
        }

        .sa-location-section h2 {
          margin: 0 0 12px;
          color: #10294b;
          font-size: 29px;
          line-height: 1.2;
        }

        .sa-location-section h3 {
          margin: 0 0 12px;
          color: #10294b;
          font-size: 20px;
        }

        .sa-location-section p {
          margin: 0;
          color: #60718a;
          font-size: 15px;
          line-height: 1.75;
        }

        .sa-location-section p {
          max-width: 760px;
          text-align: left;
          white-space: normal;
        }

        .sa-location-lead {
          max-width: 680px;
        }

        .sa-location-content-grid > div:first-child {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sa-location-section + .sa-location-section {
          margin-top: 0;
        }

        .sa-location-section h2,
        .sa-location-section h3,
        .sa-location-section p {
          text-align: left;
        }

        .sa-landmark-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .sa-landmark-item {
          padding: 13px;
          border-radius: 12px;
          background: #f4f7fa;
          color: #40546b;
          font-size: 13px;
          font-weight: 700;
        }

        .sa-challenge-card {
          border-color: #f0d5c1;
          background: #fff8f2;
        }

        .sa-testimonial {
          position: relative;
          padding: 30px;
          border-radius: 20px;
          background: #061A30;
          color: #ffffff;
        }

        .sa-quote-mark {
          color: #E18443;
          font-family: Georgia, serif;
          font-size: 55px;
          line-height: .7;
        }

        .sa-testimonial p {
          margin: 12px 0 17px;
          color: rgba(255,255,255,.9);
          font-size: 16px;
          line-height: 1.7;
        }

        .sa-testimonial strong {
          color: #ffb16f;
          font-size: 13px;
        }

        .sa-location-map-card {
          height: fit-content;
          overflow: hidden;
          border: 1px solid #e4e9ef;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 10px 26px rgba(20,48,80,.06);
        }

        .sa-map-card-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 20px;
        }

        .sa-map-card-heading div {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #10294b;
        }

        .sa-map-card-heading button {
          border: 0;
          background: transparent;
          color: #D96B27;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .sa-map-visual {
          position: relative;
          min-height: 340px;
          overflow: hidden;
          background:
            linear-gradient(90deg, rgba(255,255,255,.72) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,.72) 1px, transparent 1px),
            #e9eef3;
          background-size: 42px 42px;
        }

        .sa-map-road {
          position: absolute;
          height: 13px;
          border-radius: 999px;
          background: #ffffff;
          box-shadow: 0 0 0 2px rgba(180,190,200,.35);
          transform-origin: center;
        }

        .sa-map-road.one {
          width: 115%;
          top: 31%;
          left: -8%;
          transform: rotate(-13deg);
        }

        .sa-map-road.two {
          width: 105%;
          top: 66%;
          left: 2%;
          transform: rotate(16deg);
        }

        .sa-map-road.three {
          width: 72%;
          top: 12%;
          left: 17%;
          transform: rotate(58deg);
        }

        .sa-map-road.four {
          width: 66%;
          top: 47%;
          left: 23%;
          transform: rotate(-62deg);
        }

        .sa-map-area {
          position: absolute;
          border-radius: 50%;
          background: rgba(119, 180, 137, .26);
          filter: blur(1px);
        }

        .sa-map-area.one {
          width: 150px;
          height: 150px;
          top: 8%;
          left: 8%;
        }

        .sa-map-area.two {
          width: 180px;
          height: 180px;
          right: 8%;
          bottom: 4%;
          background: rgba(102, 164, 202, .22);
        }

        .sa-map-marker {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 24px;
          height: 24px;
          border: 6px solid #ffffff;
          border-radius: 50%;
          background: #D96B27;
          box-shadow: 0 0 0 7px rgba(217,107,39,.18), 0 8px 20px rgba(6,26,48,.22);
          transform: translate(-50%, -50%);
          z-index: 3;
        }

        .sa-map-label {
          position: absolute;
          left: 50%;
          bottom: 25px;
          transform: translateX(-50%);
          z-index: 4;
          padding: 9px 14px;
          border-radius: 10px;
          background: rgba(6,26,48,.92);
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 8px 18px rgba(6,26,48,.18);
        }

        .sa-location-map-card iframe {
          display: none;
        }

        .sa-location-map-card p {
          margin: 0;
          padding: 15px 20px 19px;
          color: #6b7a8d;
          font-size: 12px;
          line-height: 1.6;
        }

        .sa-services-list-section {
          margin-top: 28px;
          padding: 30px;
          border-radius: 22px;
          background: #ffffff;
          border: 1px solid #e4e9ef;
        }

        .sa-services-list-section h2 {
          margin: 0 0 22px;
          color: #10294b;
          font-size: 30px;
        }

        .sa-service-price-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .sa-service-price-card {
          min-height: 92px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
          padding: 16px;
          border: 1px solid #e4e9ef;
          border-radius: 15px;
          background: #f9fbfd;
        }

        .sa-service-price-card span {
          color: #52657b;
          font-size: 13px;
          line-height: 1.35;
          font-weight: 700;
        }

        .sa-service-price-card strong {
          color: #D96B27;
          font-size: 16px;
        }

        .sa-location-bottom-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          margin-top: 28px;
          padding: 30px;
          border-radius: 22px;
          background: #fff0e5;
        }

        .sa-location-bottom-cta h2 {
          margin: 0 0 8px;
          color: #10294b;
          font-size: 25px;
        }

        .sa-location-bottom-cta p {
          margin: 0;
          color: #60718a;
          font-size: 14px;
          line-height: 1.6;
        }

        @media (max-width: 950px) {
          .sa-cities-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .sa-location-hero,
          .sa-location-content-grid {
            grid-template-columns: 1fr;
          }

          .sa-service-price-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 620px) {
          .sa-services-page,
          .sa-location-page {
            padding-left: 14px;
            padding-right: 14px;
          }

          .sa-cities-grid {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .sa-heading h1 {
            font-size: 30px;
          }

          .sa-location-hero {
            padding: 25px 20px;
            border-radius: 20px;
          }

          .sa-location-hero h1 {
            font-size: 36px;
          }

          .sa-location-actions {
            flex-direction: column;
          }

          .sa-location-actions .btn {
            width: 100%;
          }

          .sa-location-summary {
            margin-top: 4px;
          }

          .sa-location-section,
          .sa-services-list-section,
          .sa-testimonial {
            padding: 21px;
          }

          .sa-landmark-list,
          .sa-service-price-grid {
            grid-template-columns: 1fr;
          }

          .sa-location-bottom-cta {
            align-items: stretch;
            flex-direction: column;
            padding: 22px;
          }

          .sa-location-bottom-cta .btn {
            width: 100%;
          }

          .sa-map-card-heading {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="app">

        {/* TOP BAR */}

        <div className="topbar">

          <div className="topbar-inner">

            <span>

              <strong>
                Kiran Packers And Movers
              </strong>{" "}

              — Moving made organised and simple.

            </span>

            <span>

              📍 Mukarampura, Karimnagar
              &nbsp; | &nbsp;
              📞 {company.phone}

            </span>

          </div>

        </div>

        {/* HEADER */}

        <header className="header">

          <nav className="nav">

            <div
              className="logo"
              onClick={() =>
                scrollToSection("home")
              }
            >

              <div className="logo-icon">
                K
              </div>

              <div className="logo-text">

                <strong>
                  Kiran Packers
                </strong>

                <span>
                  Packers & Movers
                </span>

              </div>

            </div>

            <button
              className="menu-button"
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
            >
              {mobileMenu ? "✕" : "☰"}
            </button>

            <div
              className={`nav-links ${
                mobileMenu
                  ? "mobile-open"
                  : ""
              }`}
            >

              <button
                onClick={() =>
                  scrollToSection("home")
                }
              >
                Home
              </button>

              <button
                onClick={() =>
                  scrollToSection("about")
                }
              >
                About
              </button>

              <button
                onClick={() =>
                  scrollToSection("services")
                }
              >
                Services
              </button>

              <button
                onClick={() =>
                  scrollToSection("process")
                }
              >
                Process
              </button>

              <button
                onClick={() =>
                  scrollToSection("areas")
                }
              >
                Areas
              </button>

              <button
                onClick={() =>
                  scrollToSection("journal")
                }
              >
                Journal
              </button>

              <button
                onClick={() =>
                  scrollToSection("contact")
                }
              >
                Contact
              </button>

              <button
                className="admin-nav-button"
                type="button"
                onClick={openAdminPortal}
              >
                Admin Login
              </button>

              <button
                className="nav-quote"
                onClick={() =>
                  setShowQuote(true)
                }
              >
                Get Free Quote
              </button>

            </div>

          </nav>

        </header>

        {/* HERO */}

        <section
          id="home"
          className="hero"
        >

          <div className="hero-layout">

            <div className="hero-content reveal show">

              <div className="hero-badge blink-text">
                🚚 PACKING • MOVING • RELOCATION
              </div>

              <h1 className="blink-text">
                Move with{" "}
                <span>confidence.</span>{" "}
                Settle with ease.
              </h1>

              <p className="blink-text hero-main-matter">
                Professional packing and moving support. Careful handling for homes and offices. Reliable relocation assistance across Karimnagar and beyond.
              </p>

              <div className="hero-extra-matter">

                <div className="hero-extra-intro">

                  <div className="hero-extra-label">
                    YOUR MOVE, PLANNED BETTER
                  </div>

                  <h3>
                    Complete Packing &amp; Moving Support
                  </h3>

                  <p>
                    Moving to a new home or office becomes easier when every stage is properly planned. Kiran Packers And Movers helps coordinate packing, loading, transportation, unloading and delivery according to your moving requirement.
                  </p>

                  <p>
                    Whether you are shifting within Karimnagar, moving to a nearby city or planning an intercity relocation, our team provides practical moving assistance from pickup to destination.
                  </p>

                </div>

              </div>

              <div className="hero-actions">

                <button
                  className="btn btn-primary"
                  onClick={() => setShowQuote(true)}
                >
                  📦 Get Free Quote
                </button>

                <button
                  className="btn btn-light"
                  onClick={openWhatsApp}
                >
                  💬 WhatsApp Us
                </button>

                <button
                  className="btn btn-light home-location-button"
                  onClick={getUserLocation}
                >
                  📍 Use My Location
                </button>

              </div>

              {locationMessage && (
                <div className="home-location-message">
                  {locationMessage}
                  {userLocation && (
                    <span>
                      {" "}({userLocation.latitude.toFixed(5)}, {" "}
                      {userLocation.longitude.toFixed(5)})
                    </span>
                  )}
                </div>
              )}

              <div className="hero-contact">

                <div className="hero-contact-item">
                  <strong>Location</strong>
                  Mukarampura, Karimnagar
                </div>

                <div className="hero-contact-item">
                  <strong>Call</strong>
                  {company.phone}
                </div>

                <div className="hero-contact-item">
                  <strong>Support</strong>
                  Local &amp; Intercity Moves
                </div>

              </div>

            </div>

            <div className="hero-quote-card reveal show">

              <div className="hero-quote-kicker">
                FREE MOVING ESTIMATE
              </div>

              <h2>
                Get Your Free Quote
              </h2>

              <p className="hero-quote-intro">
                Tell us a few details about your moving requirement.
              </p>

              <div className="hero-price-box">
                <strong>
                  INDICATIVE STARTING PRICE — ₹8,999+
                </strong>
                <span>
                  Final amount confirmed after move assessment.
                </span>
              </div>

              <form
                onSubmit={submitQuote}
                className="hero-quote-form"
              >

                <div className="hero-quote-fields">

                  <div className="hero-form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="hero-form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  <div className="hero-form-group">
                    <label>From Location</label>
                    <input
                      type="text"
                      placeholder="Pickup location"
                      required
                    />
                  </div>

                  <div className="hero-form-group">
                    <label>To Location</label>
                    <input
                      type="text"
                      placeholder="Destination"
                      required
                    />
                  </div>

                  <div className="hero-form-group">
                    <label>Moving Type</label>
                    <select required defaultValue="">
                      <option value="" disabled>
                        Select service
                      </option>
                      <option>House Shifting</option>
                      <option>Office Relocation</option>
                      <option>Local Shifting</option>
                      <option>Intercity Relocation</option>
                      <option>Vehicle Transportation</option>
                      <option>Packing &amp; Unpacking</option>
                    </select>
                  </div>

                  <div className="hero-form-group">
                    <label>Preferred Date</label>
                    <input type="date" />
                  </div>

                  <div className="hero-form-group hero-form-full">
                    <label>Additional Details</label>
                    <textarea
                      placeholder="Tell us about your moving requirement..."
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  className="hero-quote-submit"
                >
                  Submit Enquiry →
                </button>

              </form>

            </div>

          </div>

        </section>

        {/* TRUST */}

        <section className="trust-strip">

          <div className="container trust-grid">

            <div className="trust-item">

              <div className="trust-icon">
                📦
              </div>

              <div>

                <strong>
                  Safe Packing
                </strong>

                <span>
                  Organised handling
                </span>

              </div>

            </div>

            <div className="trust-item">

              <div className="trust-icon">
                🚚
              </div>

              <div>

                <strong>
                  Moving Support
                </strong>

                <span>
                  Planned transportation
                </span>

              </div>

            </div>

            <div className="trust-item">

              <div className="trust-icon">
                📍
              </div>

              <div>

                <strong>
                  Door-to-Door
                </strong>

                <span>
                  Pickup to delivery
                </span>

              </div>

            </div>

            <div className="trust-item">

              <div className="trust-icon">
                📞
              </div>

              <div>

                <strong>
                  Easy Contact
                </strong>

                <span>
                  Call or WhatsApp
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="section"
        >

          <div className="container">

            <div className="about-grid">

              <div className="about-image reveal">

                <div className="kiran-about-animation">

                  <div className="kiran-about-title">
                    Kiran Packers And Movers
                  </div>

                  <div className="kiran-about-subtitle">
                    Packing • Moving • Relocation
                  </div>

                  <div className="kiran-speed-line one" />
                  <div className="kiran-speed-line two" />
                  <div className="kiran-speed-line three" />

                  <div className="kiran-road" />

                  <div className="kiran-truck">
                    <div className="kiran-truck-body">
                      <div className="kiran-truck-name">KIRAN PACKERS</div>
                      <div className="kiran-truck-cabin">
                        <div className="kiran-truck-window" />
                      </div>
                      <div className="kiran-wheel one" />
                      <div className="kiran-wheel two" />
                    </div>
                  </div>

                </div>

              </div>

              <div className="about-content reveal">

                <div className="eyebrow">
                  ABOUT US
                </div>

                <h3 className="blink-text">
                  A smoother way to
                  handle your move.
                </h3>

                <p>
                  Moving home or shifting
                  a workplace involves many
                  small details. Kiran Packers
                  And Movers is focused on
                  making those steps easier
                  through organised packing,
                  loading, transportation and
                  unloading support.
                </p>

                <p>
                  Based in Mukarampura,
                  Karimnagar, we provide
                  moving assistance for local
                  requirements as well as
                  relocation needs beyond
                  the city.
                </p>

                <div className="about-points">

                  <div className="point">
                    ✓ Household Relocation
                  </div>

                  <div className="point">
                    ✓ Office Shifting
                  </div>

                  <div className="point">
                    ✓ Packing Assistance
                  </div>

                  <div className="point">
                    ✓ Loading & Unloading
                  </div>

                  <div className="point">
                    ✓ Local Moving
                  </div>

                  <div className="point">
                    ✓ Intercity Moving
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SERVICES */}

        <section
          id="services"
          className="section alt services-section"
        >

          <div className="container">

            <div className="section-heading reveal">

              <div className="eyebrow">
                OUR SERVICES
              </div>

              <h2 className="blink-text">
                Moving solutions for
                different requirements.
              </h2>

              <p>
                From household belongings
                to office equipment, our
                services are designed around
                the practical stages of
                relocation.
              </p>

            </div>

            <div className="service-grid">

              {services.map(
                (service, index) => (

                  <div
                    className="service-card reveal"
                    key={service.title}
                    style={{
                      transitionDelay:
                        `${index * 70}ms`,
                    }}
                  >

                    <div className="service-icon">
                      {service.icon}
                    </div>

                    <h3 className="blink-text">
                      {service.title}
                    </h3>

                    <p>
                      {service.text}
                    </p>

                    <span
                      className="service-link"
                      onClick={() =>
                        setSelectedService(
                          service
                        )
                      }
                    >
                      Learn More →
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

        {/* ADVANTAGES */}

        <section className="section dark">

          <div className="container">

            <div className="section-heading reveal">

              <div className="eyebrow">
                WHY CHOOSE US
              </div>

              <h2 className="blink-text">
                Practical support at
                every stage.
              </h2>

              <p>
                A relocation becomes easier
                when packing, loading,
                transportation and delivery
                are planned properly.
              </p>

            </div>

            <div className="advantage-grid">

              {advantages.map(
                (item, index) => (

                  <div
                    className="advantage-card reveal"
                    key={item.title}
                    style={{
                      transitionDelay:
                        `${index * 80}ms`,
                    }}
                  >

                    <div className="advantage-icon">
                      {item.icon}
                    </div>

                    <h3 className="blink-text">
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

        {/* PROCESS */}

        <section
          id="process"
          className="section"
        >

          <div className="container">

            <div className="section-heading reveal">

              <div className="eyebrow">
                OUR PROCESS
              </div>

              <h2 className="blink-text">
                Simple steps from pickup
                to delivery.
              </h2>

              <p>
                We keep the moving process
                easy to understand so you know
                what happens at each stage.
              </p>

            </div>

            <div className="process-grid">

              {process.map(
                (item, index) => (

                  <div
                    className="process-card reveal"
                    key={item.number}
                    style={{
                      transitionDelay:
                        `${index * 70}ms`,
                    }}
                  >

                    <div className="process-number blink-text">
                      {item.number}
                    </div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

        {/* AREAS */}

        <section
          id="areas"
          className="section alt sa-areas-section"
        >

          {!selectedCity ? (
            <div className="sa-services-page">

              <div className="sa-services-container">

                <div className="sa-heading">

                  <div className="sa-eyebrow">
                    SERVICE AREAS
                  </div>

                  <h1>
                    40+ cities. One truck away.
                  </h1>

                  <p>
                    We provide organised packing and moving support across Telangana and major cities beyond. Select a city to view its moving details.
                  </p>

                </div>

                <div className="sa-search-area">
                  <div className="sa-search-box">
                    <span className="sa-search-icon">⌕</span>
                    <input
                      type="search"
                      className="sa-search-input"
                      value={searchCity}
                      onChange={(event) =>
                        setSearchCity(event.target.value)
                      }
                      placeholder="Search your city"
                      aria-label="Search your city"
                    />
                  </div>

                  <button
                    type="button"
                    className="sa-add-location-button"
                    onClick={() => setShowAddLocation(true)}
                  >
                    + Add New Location
                  </button>
                </div>

                <div className="sa-search-count">
                  Showing {filteredScreenshotServiceAreas.length + filteredCustomLocations.length} locations
                </div>

                <div className="sa-cities-grid">

                  {[
                    ...filteredScreenshotServiceAreas.map((area) => ({
                      ...area,
                      isCustom: false,
                    })),
                    ...filteredCustomLocations.map((area) => ({
                      ...area,
                      isCustom: true,
                    })),
                  ].map((area) => (

                    <div
                      key={`${area.city}-${area.isCustom ? "custom" : "default"}`}
                      className="sa-city-card"
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        setSelectedCity(getCityDetails(area))
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedCity(getCityDetails(area));
                        }
                      }}
                    >

                      <span className="sa-city-icon">
                        📍
                      </span>

                      <span className="sa-city-card-content">
                        <span className="sa-city-card-title">
                          {area.city}
                        </span>

                        <span className="sa-city-card-subtitle">
                          Packers & Movers
                        </span>

                        {area.isCustom && (
                          <button
                            type="button"
                            className="sa-delete-location-button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDeleteCustomLocation(area.city);
                            }}
                          >
                            🗑 Delete Location
                          </button>
                        )}
                      </span>

                      <span className="sa-city-arrow">
                        ↗
                      </span>

                    </div>

                  ))}

                </div>

                {filteredScreenshotServiceAreas.length === 0 &&
                  filteredCustomLocations.length === 0 && (
                    <div className="sa-no-results">
                      No city found for <strong>{searchCity}</strong>. Try another city name or add a new location.
                    </div>
                  )}

              </div>

            </div>
          ) : (
            <div className="sa-location-page">

              <div className="sa-location-container">

                <button
                  type="button"
                  className="sa-back-button"
                  onClick={() => setSelectedCity(null)}
                >
                  ← Back to Service Areas
                </button>

                <div className="sa-breadcrumb">
                  Home <span>/</span> Locations <span>/</span> {selectedCity.city}
                </div>

                <div className="sa-location-hero">

                  <div className="sa-location-hero-copy">

                    <div className="sa-location-state">
                      {selectedCity.district || "Telangana"}
                    </div>

                    <h1>
                      Packers and Movers in {selectedCity.city}
                    </h1>

                    <p className="sa-location-lead">
                      Starting from <strong>{selectedCity.startingPrice}</strong> for local shifting in {selectedCity.city} — {selectedCity.movingTime}. Licensed, insured, and focused on organised moving support.
                    </p>

                    <div className="sa-location-actions">

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowQuote(true)}
                      >
                        Get Free Quote for {selectedCity.city} Move
                      </button>

                      <button
                        type="button"
                        className="btn btn-dark-outline"
                        onClick={callNow}
                      >
                        📞 Call Now
                      </button>

                    </div>

                  </div>

                  <div className="sa-location-summary">
                    <div>
                      <span>Starting price</span>
                      <strong>{selectedCity.startingPrice}</strong>
                    </div>
                    <div>
                      <span>Service distance</span>
                      <strong>{selectedCity.distance}</strong>
                    </div>
                    <div>
                      <span>Location</span>
                      <strong>{selectedCity.location}</strong>
                    </div>
                  </div>

                </div>

                <div className="sa-location-content-grid">

                  <div>

                    <div className="sa-location-section">
                      <div className="sa-eyebrow">MOVING IN {selectedCity.city.toUpperCase()}</div>
                      <h2>Moving in {selectedCity.city}, done right</h2>
                      <p>{selectedCity.description}</p>
                    </div>

                    <div className="sa-location-section">
                      <h3>Local landmarks</h3>
                      <div className="sa-landmark-list">
                        {selectedCity.landmarks.map((landmark) => (
                          <div key={landmark} className="sa-landmark-item">
                            <span>📍</span>
                            {landmark}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sa-location-section sa-challenge-card">
                      <h3>{selectedCity.city} moving challenges</h3>
                      <p>{selectedCity.challenges}</p>
                    </div>

                    <div className="sa-testimonial">
                      <div className="sa-quote-mark">“</div>
                      <p>{selectedCity.testimonial}</p>
                      <strong>— {selectedCity.testimonialBy}</strong>
                    </div>

                  </div>

                  <div className="sa-location-map-card">
                    <div className="sa-map-card-heading">
                      <div>
                        <span>📍</span>
                        <strong>{selectedCity.city}, Telangana</strong>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCity.location)}`,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        Open in Google Maps ↗
                      </button>
                    </div>

                    <div className="sa-map-visual" aria-label={`${selectedCity.city} location map`}>
                      <div className="sa-map-area one" />
                      <div className="sa-map-area two" />
                      <div className="sa-map-road one" />
                      <div className="sa-map-road two" />
                      <div className="sa-map-road three" />
                      <div className="sa-map-road four" />
                      <div className="sa-map-marker" aria-hidden="true" />
                      <div className="sa-map-label">
                        {selectedCity.city}, Telangana
                      </div>
                    </div>

                    <p>
                      Serving all of {selectedCity.city}, Telangana from our Karimnagar head office.
                    </p>
                  </div>

                </div>

                <div className="sa-services-list-section">
                  <div className="sa-eyebrow">OUR SERVICES IN {selectedCity.city.toUpperCase()}</div>
                  <h2>Our services in {selectedCity.city}</h2>
                  <div className="sa-service-price-grid">
                    {selectedCity.services.map(([name, price]) => (
                      <div className="sa-service-price-card" key={name}>
                        <span>{name}</span>
                        <strong>{price}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sa-location-bottom-cta">
                  <div>
                    <div className="sa-eyebrow">READY TO MOVE?</div>
                    <h2>Plan your {selectedCity.city} move with Kiran Packers And Movers.</h2>
                    <p>Share your requirement and we can discuss packing, loading, transportation and delivery support.</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowQuote(true)}
                  >
                    Get Free Quote
                  </button>
                </div>

              </div>

            </div>
          )}

        </section>

        {/* MOVING JOURNAL */}

        <section
          id="journal"
          className="section journal-section"
        >

          <div className="container">

            <div className="section-heading reveal">

              <div className="eyebrow">
                THE MOVING JOURNAL
              </div>

              <h2 className="blink-text">
                Guides worth packing.
              </h2>

              <p>
                Helpful moving guides,
                checklists and packing tips
                to make your next relocation
                more organised.
              </p>

            </div>

            <div className="journal-grid">

              {guides.map(
                (guide, index) => (

                  <article
                    className="journal-card reveal"
                    key={guide.title}
                    style={{
                      transitionDelay:
                        `${index * 100}ms`,
                    }}
                  >

                    <div className="journal-icon">
                      {guide.icon}
                    </div>

                    <div className="journal-meta">
                      {guide.category}
                      {" "}•{" "}
                      {guide.time}
                    </div>

                    <h3 className="blink-text">
                      {guide.title}
                    </h3>

                    <p>
                      {guide.text}
                    </p>

                    <button
                      className="journal-read"
                      onClick={() =>
                        setSelectedGuide(
                          guide
                        )
                      }
                    >
                      Read Guide →
                    </button>

                  </article>

                )
              )}

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="cta">

          <div className="container cta-inner">

            <div className="reveal">

              <h2 className="blink-text">
                Planning your next move?
              </h2>

              <p>
                Share your shifting
                requirement with Kiran
                Packers And Movers and
                let us discuss the right
                moving support for you.
              </p>

            </div>

            <div className="cta-actions reveal">

              <button
                className="btn btn-primary"
                onClick={() =>
                  setShowQuote(true)
                }
              >
                Get Free Quote
              </button>

              <button
                className="btn btn-light"
                onClick={openWhatsApp}
              >
                WhatsApp
              </button>

            </div>

          </div>

        </section>

        {/* FAQ */}

        <section className="section faq-section">

          <div className="container">

            <div className="section-heading reveal">

              <div className="eyebrow">
                FAQ
              </div>

              <h2 className="blink-text">
                Frequently asked
                questions.
              </h2>

              <p>
                A few common questions
                about packing and moving
                services.
              </p>

            </div>

            <div className="faq-grid">

              {faqs.map(
                (faq, index) => (

                  <div
                    className="faq-item reveal"
                    key={faq.q}
                    style={{
                      transitionDelay:
                        `${index * 60}ms`,
                    }}
                  >

                    <h3 className="blink-text">
                      {faq.q}
                    </h3>

                    <p>
                      {faq.a}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

        {/* CONTACT */}

        <section
          id="contact"
          className="section alt"
        >

          <div className="container">

            <div className="contact-grid">

              <div className="contact-card reveal">

                <div className="eyebrow">
                  CONTACT US
                </div>

                <h2 className="blink-text">
                  Let's plan your move.
                </h2>

                <p>
                  Contact Kiran Packers
                  And Movers for your
                  packing, moving and
                  relocation requirement.
                </p>

                <div className="contact-item">

                  <div className="contact-item-icon">
                    📍
                  </div>

                  <div>

                    <strong>
                      Address
                    </strong>

                    <span>
                      {company.address}
                    </span>

                  </div>

                </div>

                <div className="contact-item">

                  <div className="contact-item-icon">
                    📞
                  </div>

                  <div>

                    <strong>
                      Phone
                    </strong>

                    <span>
                      {company.phone}
                    </span>

                  </div>

                </div>

                <div className="contact-item">

                  <div className="contact-item-icon">
                    ✉️
                  </div>

                  <div>

                    <strong>
                      Email
                    </strong>

                    <span>
                      {company.email}
                    </span>

                  </div>

                </div>

                <div className="contact-actions">

                  <button
                    className="btn btn-primary"
                    onClick={callNow}
                  >
                    📞 Call Now
                  </button>

                  <button
                    className="btn btn-light"
                    onClick={openWhatsApp}
                  >
                    💬 WhatsApp
                  </button>

                </div>

              </div>

              <div className="map-card reveal">

                <iframe
                  title="Kiran Packers And Movers Location"
                  src="https://www.google.com/maps?q=Kiran+Packers+And+Movers,+9-1-218,+Street+No.+7,+Mukarampura,+Karimnagar,+Telangana&output=embed"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </div>

            </div>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="footer">

          <div className="container">

            <div className="footer-grid">

              <div>

                <h3>
                  Kiran Packers And Movers
                </h3>

                <p>
                  Packing, moving and
                  relocation support for
                  households, offices and
                  personal belongings.
                  Based in Mukarampura,
                  Karimnagar.
                </p>

              </div>

              <div>

                <h3>
                  Quick Links
                </h3>

                <div className="footer-links">

                  <button
                    onClick={() =>
                      scrollToSection("home")
                    }
                  >
                    Home
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("about")
                    }
                  >
                    About
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("services")
                    }
                  >
                    Services
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("process")
                    }
                  >
                    Process
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("areas")
                    }
                  >
                    Areas
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("journal")
                    }
                  >
                    Journal
                  </button>

                  <button
                    onClick={() =>
                      scrollToSection("contact")
                    }
                  >
                    Contact
                  </button>

                </div>

              </div>

              <div>

                <h3>
                  Contact
                </h3>

                <div className="footer-links">

                  <button onClick={callNow}>
                    📞 {company.phone}
                  </button>

                  <button
                    onClick={openWhatsApp}
                  >
                    💬 WhatsApp
                  </button>

                  <span>
                    ✉️ {company.email}
                  </span>

                  <span>
                    📍 {company.address}
                  </span>

                </div>

              </div>

              <div>

                <h3>
                  Moving Support
                </h3>

                <p>
                  Residential shifting, office relocation, packing and unpacking, local moves, intercity relocation and vehicle transportation.
                </p>

                <p style={{ marginTop: "12px" }}>
                  Serving Karimnagar and nearby Telangana cities with organised moving support.
                </p>

              </div>

            </div>

            <div className="footer-bottom">

              <span>

                © {new Date().getFullYear()}
                {" "}
                Kiran Packers And Movers.
                All Rights Reserved.

              </span>

              <span>

                Designed & Developed by{" "}

                <a
                  className="astroidea"
                  href="https://www.astroideasoftway.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  AstroIdea Softway LLP
                </a>

              </span>

            </div>

          </div>

        </footer>

        {/* FLOATING BUTTONS */}

        <div className="floating-buttons">

          <button
            className="floating-button float-call"
            onClick={callNow}
            title="Call Kiran Packers And Movers"
          >
            📞
          </button>

          <button
            className="floating-button float-whatsapp"
            onClick={openWhatsApp}
            title="WhatsApp Kiran Packers And Movers"
          >
            💬
          </button>

        </div>

        {/* ADMIN LOGIN PORTAL */}

        {showAdminLogin && (

          <div
            className="admin-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeAdminPortal();
              }
            }}
          >

            <div
              className="admin-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="admin-close"
                type="button"
                onClick={closeAdminPortal}
                aria-label="Close admin login"
              >
                ✕
              </button>

              <div className="admin-brand">
                <div className="admin-brand-icon">K</div>

                <div>
                  <div className="admin-kicker">
                    Packer & Mover Admin Portal
                  </div>
                  <div className="admin-brand-title">
                    Kiran Packers And Movers
                  </div>
                </div>
              </div>

              <h2>Welcome Back!</h2>

              <p className="admin-subtitle">
                Please sign in to manage your logistics dashboard.
              </p>

              <form onSubmit={handleAdminLogin}>

                <div className="admin-field">
                  <label htmlFor="admin-email">
                    Email Address
                  </label>

                  <input
                    id="admin-email"
                    className="admin-input"
                    type="email"
                    placeholder="admin@packersmovers.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="admin-password">
                    Password
                  </label>

                  <div className="admin-input-wrap">
                    <input
                      id="admin-password"
                      className="admin-input has-eye"
                      type={showAdminPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />

                    <button
                      className="admin-eye"
                      type="button"
                      onClick={() =>
                        setShowAdminPassword((value) => !value)
                      }
                      aria-label={
                        showAdminPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showAdminPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="admin-options">
                  <label className="remember-device">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) =>
                        setRememberDevice(e.target.checked)
                      }
                    />
                    Remember this device
                  </label>

                  <button
                    className="forgot-password"
                    type="button"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  className="admin-login-submit"
                  type="submit"
                >
                  LOGIN
                </button>

                <div className="admin-security-note">
                  🔒 Secure admin access • Authorised personnel only
                </div>

              </form>

            </div>

          </div>

        )}

        {/* QUOTE MODAL */}

        {showQuote && (

          <div
            className="modal-backdrop"
            onClick={() =>
              setShowQuote(false)
            }
          >

            <div
              className="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <h2 className="blink-text">
                    Get Your Free Quote
                  </h2>

                  <p>
                    Tell us a few details
                    about your moving
                    requirement.
                  </p>

                </div>

                <button
                  className="close-button"
                  onClick={() =>
                    setShowQuote(false)
                  }
                >
                  ✕
                </button>

              </div>

              <form
                onSubmit={submitQuote}
              >

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Your Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      From Location
                    </label>

                    <input
                      type="text"
                      placeholder="Pickup location"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      To Location
                    </label>

                    <input
                      type="text"
                      placeholder="Destination"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Moving Type
                    </label>

                    <select
                      required
                      defaultValue=""
                    >

                      <option
                        value=""
                        disabled
                      >
                        Select service
                      </option>

                      <option>
                        House Shifting
                      </option>

                      <option>
                        Office Relocation
                      </option>

                      <option>
                        Local Shifting
                      </option>

                      <option>
                        Intercity Relocation
                      </option>

                      <option>
                        Vehicle Transportation
                      </option>

                      <option>
                        Packing & Unpacking
                      </option>

                    </select>

                  </div>

                  <div className="form-group">

                    <label>
                      Preferred Date
                    </label>

                    <input
                      type="date"
                    />

                  </div>

                  <div className="form-group full">

                    <label>
                      Additional Details
                    </label>

                    <textarea
                      placeholder="Tell us about your items or moving requirement..."
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                >
                  Submit Enquiry
                </button>

              </form>

            </div>

          </div>

        )}

        {showAddLocation && (
          <div
            className="sa-add-location-overlay"
            onClick={() => setShowAddLocation(false)}
          >
            <div
              className="sa-add-location-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sa-add-location-header">
                <div>
                  <h2>Add New Location</h2>
                  <p>
                    Add another city to your Service Areas list. It will be saved on this browser.
                  </p>
                </div>

                <button
                  type="button"
                  className="sa-add-location-close"
                  onClick={() => setShowAddLocation(false)}
                  aria-label="Close add location"
                >
                  ×
                </button>
              </div>

              <form
                className="sa-add-location-form"
                onSubmit={handleAddLocation}
              >
                <div className="sa-form-field">
                  <label htmlFor="new-location-city">City Name</label>
                  <input
                    id="new-location-city"
                    type="text"
                    value={newLocation.city}
                    onChange={(event) =>
                      setNewLocation((current) => ({
                        ...current,
                        city: event.target.value,
                      }))
                    }
                    placeholder="Enter city name"
                    required
                  />
                </div>

                <div className="sa-form-field">
                  <label htmlFor="new-location-state">State</label>
                  <input
                    id="new-location-state"
                    type="text"
                    value={newLocation.state}
                    onChange={(event) =>
                      setNewLocation((current) => ({
                        ...current,
                        state: event.target.value,
                      }))
                    }
                    placeholder="Enter state"
                  />
                </div>

                <div className="sa-form-field">
                  <label htmlFor="new-location-price">Starting Price</label>
                  <input
                    id="new-location-price"
                    type="text"
                    value={newLocation.startingPrice}
                    onChange={(event) =>
                      setNewLocation((current) => ({
                        ...current,
                        startingPrice: event.target.value,
                      }))
                    }
                    placeholder="₹3,999"
                  />
                </div>

                <div className="sa-form-field">
                  <label htmlFor="new-location-time">Moving Time</label>
                  <input
                    id="new-location-time"
                    type="text"
                    value={newLocation.movingTime}
                    onChange={(event) =>
                      setNewLocation((current) => ({
                        ...current,
                        movingTime: event.target.value,
                      }))
                    }
                    placeholder="Same-day local support"
                  />
                </div>

                <div className="sa-add-location-actions">
                  <button
                    type="button"
                    className="sa-add-cancel"
                    onClick={() => setShowAddLocation(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="sa-add-submit"
                  >
                    Add Location
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SERVICE MODAL */}

        {selectedService && (

          <div
            className="modal-backdrop"
            onClick={() =>
              setSelectedService(null)
            }
          >

            <div
              className="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <h2>
                    {selectedService.icon}{" "}
                    {selectedService.title}
                  </h2>

                  <p>
                    Kiran Packers And Movers
                  </p>

                </div>

                <button
                  className="close-button"
                  onClick={() =>
                    setSelectedService(null)
                  }
                >
                  ✕
                </button>

              </div>

              <p>
                {selectedService.text}
              </p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedService(null);
                  setShowQuote(true);
                }}
              >
                Request A Quote
              </button>

            </div>

          </div>

        )}

        {/* JOURNAL MODAL */}

        {selectedGuide && (

          <div
            className="modal-backdrop"
            onClick={() =>
              setSelectedGuide(null)
            }
          >

            <div
              className="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <div className="journal-modal-meta">

                    {selectedGuide.icon}{" "}

                    {selectedGuide.category}

                    {" "}•{" "}

                    {selectedGuide.time}

                  </div>

                  <h2>
                    {selectedGuide.title}
                  </h2>

                </div>

                <button
                  className="close-button"
                  onClick={() =>
                    setSelectedGuide(null)
                  }
                >
                  ✕
                </button>

              </div>

              <p className="journal-modal-text">
                {selectedGuide.text}
              </p>

              <div className="journal-modal-note">

                📦 Helpful moving information
                from Kiran Packers And Movers.
                Plan your packing, pickup,
                transportation and delivery
                carefully for a smoother move.

              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedGuide(null);
                  setShowQuote(true);
                }}
              >
                Get Free Quote
              </button>

            </div>

          </div>

        )}

      </div>
    </>
  );
}