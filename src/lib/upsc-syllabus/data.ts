/** UPSC syllabus hub data — migrated from index.html */
export const SYLLABUS_DATA = {
  polity: {
    name: "Indian Polity & Constitution",
    icon: "⚖️",
    paper: "GS Paper 2",
    description: "Constitutional framework, democratic institutions, and governance structure of India",
    chapters: [
      { id:"union-territory", title:"Union and its Territory", sub:"Articles 1–4, States, UTs, Reorganisation", priority:"high", prelims:9, mains:5, status:"live", file:"../union-and-its-territory-upsc-notes.html", readTime:18, tags:["Art.1","Art.3","Art.4","Reorganisation","J&K","Ladakh"] },
      { id:"citizenship", title:"Citizenship", sub:"Articles 5–11, Citizenship Act 1955, CAA", priority:"high", prelims:7, mains:4, status:"live", file:"../citizenship-upsc-notes.html", readTime:15, tags:["CAA","NRC","OCI","Renunciation"] },
      { id:"fundamental-rights", title:"Fundamental Rights", sub:"Articles 12–35, Writ Jurisdiction", priority:"high", prelims:12, mains:7, status:"live", file:"../fundamental-rights-upsc-notes.html", readTime:25, tags:["Art.19","Art.21","Art.32","Writs","DPSP"] },
      { id:"dpsp", title:"Directive Principles & Duties", sub:"Articles 36–51A", priority:"high", prelims:8, mains:5, status:"coming-soon", readTime:16, tags:["DPSP","Fundamental Duties","Art.44","UCC"] },
      { id:"parliament", title:"Parliament", sub:"Lok Sabha, Rajya Sabha, Sessions, Legislation", priority:"high", prelims:10, mains:6, status:"coming-soon", readTime:22, tags:["Lok Sabha","Rajya Sabha","Money Bill","Joint Sitting"] },
      { id:"president", title:"President & Vice President", sub:"Election, Powers, Veto, Ordinances", priority:"high", prelims:7, mains:4, status:"coming-soon", readTime:18, tags:["Pocket Veto","Ordinance","Art.356","Pardoning"] },
      { id:"pm-cabinet", title:"PM, Cabinet & CoM", sub:"Council of Ministers, Collective Responsibility", priority:"high", prelims:6, mains:5, status:"coming-soon", readTime:14, tags:["PM","Cabinet","Art.74","Art.75"] },
      { id:"judiciary", title:"Judiciary – Supreme Court & HCs", sub:"Articles 124–147, Judicial Review", priority:"high", prelims:11, mains:8, status:"coming-soon", readTime:24, tags:["Judicial Review","PIL","Collegium","Art.136"] },
      { id:"federalism", title:"Centre-State Relations", sub:"Legislative, Administrative, Financial", priority:"high", prelims:8, mains:7, status:"coming-soon", readTime:20, tags:["Art.246","Schedule 7","GST","Finance Commission"] },
      { id:"local-governance", title:"Local Self Government", sub:"73rd & 74th Amendments", priority:"medium", prelims:5, mains:4, status:"coming-soon", readTime:14, tags:["73rd","74th","Panchayati Raj","Urban Bodies"] },
      { id:"emergency", title:"Emergency Provisions", sub:"Articles 352, 356, 360", priority:"high", prelims:8, mains:5, status:"coming-soon", readTime:16, tags:["Art.352","Art.356","President's Rule","Art.360"] },
      { id:"constitutional-bodies", title:"Constitutional Bodies", sub:"UPSC, EC, CAG", priority:"medium", prelims:9, mains:4, status:"coming-soon", readTime:18, tags:["UPSC","Election Commission","CAG","NHRC"] },
      { id:"statutory-bodies", title:"Statutory & Quasi-Judicial Bodies", sub:"Lokpal, CBI, CIC", priority:"medium", prelims:7, mains:3, status:"coming-soon", readTime:14, tags:["Lokpal","CBI","CIC","RTI"] },
      { id:"amendments", title:"Important Constitutional Amendments", sub:"1st to 106th", priority:"high", prelims:8, mains:4, status:"coming-soon", readTime:16, tags:["42nd","44th","86th","101st","105th"] },
      { id:"schedules", title:"Schedules of the Constitution", sub:"All 12 Schedules", priority:"medium", prelims:6, mains:2, status:"coming-soon", readTime:10, tags:["8th Schedule","10th Schedule"] },
      { id:"comparison", title:"Borrowed Features & Basic Structure", sub:"Sources, Preamble", priority:"medium", prelims:5, mains:3, status:"coming-soon", readTime:12, tags:["Preamble","Basic Structure","Borrowed"] }
    ]
  },
  ancient: {
    name: "Ancient Indian History",
    icon: "🏺",
    paper: "GS Paper 1",
    description: "From Prehistoric India and IVC to the Gupta Golden Age — civilisations, religions, and empires",
    chapters: [
      { id:"ancient-topic01", title:"Sources of Ancient Indian History", sub:"Topic 01: Inscriptions, Coins, Literary Sources, Foreign Accounts", priority:"high", prelims:7, mains:4, status:"live", readTime:30, tags:["Inscriptions","Coins","Megasthenes","Brahmi","Arthashastra","Bhimbetka"] },
      { id:"ancient-topic02", title:"The Stone Age", sub:"Topic 02: Palaeolithic, Mesolithic, Neolithic, Megalithic & Rock Art", priority:"high", prelims:8, mains:3, status:"live", readTime:35, tags:["Microliths","Bhimbetka","Mehrgarh","Bagor","Megalithic","Black-and-Red Ware"] },
      { id:"ancient-topic03", title:"The Chalcolithic Age", sub:"Topic 03: Ahar, Malwa, Kayatha, Jorwe, Savalda, Rangpur Cultures", priority:"high", prelims:8, mains:4, status:"live", readTime:30, tags:["Jorwe","Inamgaon","Daimabad Bronzes","Navdatoli","Intramural Burial","BRW"] },
      { id:"ancient-topic04", title:"Indus Valley Civilization (IVC)", sub:"Topic 04: Discovery, Extent, Phases, Sites, Town Planning, Economy, Decline", priority:"high", prelims:10, mains:5, status:"live", readTime:45, tags:["Great Bath","Pashupati Seal","Lothal Dockyard","Dholavira","Indus Script","Rakhigarhi","Decline Theories"] },
      { id:"ancient-topic05", title:"The Vedic Age", sub:"Topic 05: Early Vedic (Rig Vedic) & Later Vedic — Aryans, Assemblies, Varna, Ashramas, 16 Sanskaras, Vedic Literature", priority:"high", prelims:9, mains:5, status:"live", readTime:40, tags:["Rigveda","Sabha","Samiti","Vidatha","Boghaz Koi","Varna System","16 Sanskaras","Vedangas","Upanishads","Shatapatha Brahmana"] },
      { id:"ancient-topic06", title:"Buddhism and Jainism", sub:"Topic 06: Gautama Buddha, Four Noble Truths, Buddhist Councils, Mahavira, Pancha Mahavrata, Jain Sects, Heterodox Schools", priority:"high", prelims:10, mains:5, status:"live", readTime:50, tags:["Four Noble Truths","Eightfold Path","Triratna","Bodhisattva","Pancha Mahavrata","Anekantavada","Digambara","Shvetambara","Ajivika","Niyativada","Buddhist Councils","Mahayana","Hinayana"] },
      { id:"ancient-topic07", title:"The Mahajanapada Period (600–300 BC)", sub:"Topic 07: All 16 Mahajanapadas, Rise of Magadha, Haryanka/Shishunaga/Nanda Dynasties, Society, Admin, NBP Ware, Punch-Marked Coins", priority:"high", prelims:9, mains:4, status:"live", readTime:55, tags:["16 Mahajanapadas","Vajji","Gana-Sangha","Bimbisara","Ajatashatru","Mahashilakantaka","Pataliputra","Mahapadma Nanda","Ekrat","NBP Ware","Karshapana","Hyphasis Mutiny","Chaturanga"] },
      { id:"ancient-topic08", title:"Foreign Invasions on India", sub:"Topic 08: Persian Invasion (Cyrus, Darius I, Xerxes), Macedonian Invasion (Alexander), Battle of Hydaspes, Hyphasis Mutiny, Impact on India", priority:"high", prelims:8, mains:4, status:"live", readTime:35, tags:["Hindush","Behistun","Darius I","Kharoshthi","Alexander","Hydaspes","Porus","Bucephalus","Hyphasis Mutiny","Ambhi","Seleucid Treaty","Nearchus","Gandhara Art"] },
      { id:"ancient-topic09", title:"The Mauryan Empire (324–185 BC)", sub:"Topic 09: Origin theories, Chandragupta–Bindusara–Ashoka–Brihadratha, Kalinga War, Dhamma, Edicts, Arthashastra, Indica, Administration, Economy, Fall", priority:"high", prelims:10, mains:5, status:"live", readTime:55, tags:["Chandragupta Maurya","Chanakya","Arthashastra","Bindusara","Amitraghata","Ashoka","Kalinga War","Dhamma","Dhammavijaya","14 Major Rock Edicts","Pillar Edicts","Maski Edict","Rummindei","Bhabru","Devanampiya Piyadasi","Rajuka","Pradeshika","Megasthenes","Indica","Mudrarakshasa","Sandrocottus","Pushyamitra Shunga","Brihadratha","NBPW","Sallekhana"] },
      { id:"ancient-topic10", title:"The Post-Mauryan Age (185 BC–300 AD)", sub:"Topic 10: Indo-Greeks, Sakas, Pahlavas, Kushanas (Kanishka), Shungas, Kanvas, Satavahanas (Gautamiputra), Chedi (Kharavela), Mahayana, Gandhara/Mathura/Amravati Art, Indo-Roman Trade", priority:"high", prelims:9, mains:5, status:"live", readTime:50, tags:["Indo-Greeks","Menander","Milindapanho","Heliodorus Pillar","Sakas","Rudradaman","Junagadh Inscription","Gondophernes","Kushanas","Kanishka","Saka Era","Fourth Buddhist Council","Mahayana","Ashvaghosha","Nagarjuna","Charaka","Gandhara School","Mathura School","Amravati School","Shungas","Pushyamitra","Satavahanas","Gautamiputra Satakarni","Nasik Prashasti","Kharavela","Hathigumpha","Periplus","Indo-Roman Trade","Arikamedu"] },
      { id:"ancient-topic11", title:"The Gupta Era (319–550 AD)", sub:"Topic 11: Sri Gupta to Skandagupta, Samudragupta (Allahabad Pillar), Chandragupta II Vikramaditya, Fa-Hien, Kumaragupta–Nalanda, Skandagupta–Huns, Nagara temple, Ajanta, Aryabhata, Kalidasa, Decline", priority:"high", prelims:10, mains:5, status:"live", readTime:60, tags:["Sri Gupta","Chandragupta I","Lichchavi","Samudragupta","Allahabad Pillar","Harisena","Indian Napoleon","Chandragupta II","Vikramaditya","Sakari","Mehrauli Iron Pillar","Fa-Hien","Navaratna","Kalidasa","Kumaragupta","Nalanda","Skandagupta","Bhitari","Junagadh Skandagupta","Hun Invasion","Toramana","Mihirakula","Yashodharman","Mandasor","Nagara Temple","Dashavatara Deogarh","Bhitargaon","Ajanta","Sarnath Buddha","Sultanganj Bronze","Aryabhatiya","Varahamihira","Agrahara","Vishti","Eran Sati"] },
      { id:"ancient-topic12", title:"The Post-Gupta Age (c. 550–750 AD)", sub:"Topic 12: Vakatakas (Harishena, Ajanta later phase), Maitraka–Maukhari–Gauda–Huna, Pushyabhuti–Harshavardhana (Kannauj & Prayag Assembly, Hiuen Tsang), W. Chalukyas of Badami (Pulakeshin II, Aihole–Badami–Pattadakal), Pallavas of Kanchi (Mamalla, Mahabalipuram, Shore Temple, Kailashanatha), Kadamba, W. Ganga, Kalabhra, Bengal–Kamarupa", priority:"high", prelims:10, mains:5, status:"live", readTime:60, tags:["Vakataka","Harishena","Prabhavati Gupta","Ajanta Later Phase","Maitraka","Vallabhi","Maukhari","Ishanavarman","Gauda","Shashanka","Karnasuvarna","Matsyanyaya","Huna","Toramana","Mihirakula","Yashodharman","Sondani","Pushyabhuti","Harshavardhana","Harshacharita","Banabhatta","Hiuen Tsang","Si-yu-ki","Kannauj Assembly","Prayag Assembly","Pulakeshin II","Aihole Inscription","Ravikirti","Vatapikonda","Narasimhavarman I","Mamalla","Mahendravarman I","Mattavilasa Prahasana","Mahabalipuram","Pancha Rathas","Shore Temple","Kailashanatha Kanchi","Pattadakal","Virupaksha","Lokamahadevi","Badami Caves","Aihole","Kadamba","Mayurasharman","Banavasi","Western Gangas","Shravanabelagola","Chamundaraya","Kalabhra","Velvikudi","Ikshvaku","Nagarjunakonda","Bhaskaravarman","Nidhanpur Plates"] },
    ]
  },
  medieval: {
    name: "Medieval Indian History",
    icon: "🕌",
    paper: "GS Paper 1",
    description: "Delhi Sultanate, Mughal Empire, Bhakti-Sufi movements, and Maratha rise",
    chapters: [
      { id:"medieval-topic01", title:"Early Medieval India (c. 750–1200 AD)", sub:"Topic 01: Pratiharas, Palas, Rashtrakutas, Tripartite Struggle, regional dynasties, society & economy", priority:"high", prelims:10, mains:5, status:"live", readTime:65, tags:["Pratihara","Pala","Rashtrakuta","Tripartite Struggle","Kannauj","Feudalism","Adi Shankara"] },
      { id:"medieval-topic02", title:"The Chola Empire (c. 850–1200 AD)", sub:"Topic 02: Vijayalaya to Rajendra I, administration, navy, art & temple architecture", priority:"high", prelims:10, mains:5, status:"live", readTime:65, tags:["Cholas","Rajaraja I","Rajendra I","Brihadeshwara","Uttaramerur","Navy","Guilds"] },
      { id:"medieval-topic03", title:"The Age of Conflict & Turkish Invasions (c. 1000–1200 AD)", sub:"Topic 03: Rajput states, Arab/Ghaznavid/Ghorid invasions, reasons for Turkish success", priority:"high", prelims:10, mains:5, status:"live", readTime:65, tags:["Rajputs","Mahmud of Ghazni","Muhammad Ghori","Tarain","Chandawar","Iqta","Mounted archery"] },
      { id:"medieval-topic04", title:"The Delhi Sultanate (1206–1526 AD)", sub:"Topic 04: Slave, Khalji, Tughlaq, Sayyid, Lodi — institutions, economy, society & culture", priority:"high", prelims:10, mains:6, status:"live", readTime:70, tags:["Delhi Sultanate","Iqta","Alauddin market reforms","Muhammad bin Tughlaq","Firuz Shah","Amir Khusrau"] },
      { id:"medieval-topic05", title:"Vijayanagar & Bahmani Kingdoms (1336–1646 AD)", sub:"Topic 05: Vijayanagara & Deccan states — polity, economy, art & architecture", priority:"high", prelims:9, mains:5, status:"live", readTime:60, tags:["Vijayanagara","Bahmani","Deccan Sultanates","Hampi","Krishnadevaraya"] },
      { id:"medieval-topic06", title:"The Mughal Empire (1526–1707 AD)", sub:"Topic 06: Babur to Aurangzeb — administration, mansabdari, revenue, culture, decline", priority:"high", prelims:10, mains:6, status:"live", readTime:75, tags:["Mughals","Akbar","Mansabdari","Zabt","Aurangzeb","Marathas"] },
      { id:"medieval-topic07", title:"Marathas & Regional States (1707–1818 AD)", sub:"Topic 07: Maratha rise, Shivaji, Peshwas, regional kingdoms in 18th century", priority:"high", prelims:9, mains:6, status:"live", readTime:60, tags:["Shivaji","Peshwas","Third Battle of Panipat","Mysore","Sikhs"] },
      { id:"medieval-topic08", title:"Bhakti & Sufi Religious Movements", sub:"Topic 08: Bhakti saints, Sufi orders, syncretism, impact on society & culture", priority:"high", prelims:9, mains:6, status:"live", readTime:55, tags:["Bhakti","Sufism","Kabir","Nanak","Chishti","Composite culture"] },
    ]
  },
  history: {
    name: "Modern Indian History",
    icon: "📜",
    paper: "GS Paper 1",
    description: "Europeans in India, British expansion, economic policies, 1857 revolt, nationalism and independence",
    chapters: [
      { id:"modern-mod1", title:"Advent of Europeans & British Expansion", sub:"Mod 1: Portuguese, Dutch, French, EIC, Plassey, Buxar, Subsidiary Alliance", priority:"high", prelims:8, mains:4, status:"live", file:"../modern-mod1-europeans-british-upsc-notes.html", readTime:20, tags:["East India Company","Plassey","Buxar","Subsidiary Alliance","Doctrine of Lapse"] },
      { id:"modern-mod2", title:"British Economic Policy & Social Reforms", sub:"Mod 2: Drain of wealth, land revenue, social legislation, press", priority:"high", prelims:8, mains:5, status:"live", file:"../modern-mod2-british-economic-social-upsc-notes.html", readTime:20, tags:["Drain of Wealth","Permanent Settlement","Ryotwari","Social Reforms"] },
      { id:"modern-mod3", title:"1857 Revolt & Rise of Nationalism", sub:"Mod 3: Revolt of 1857, INC, Moderates vs Extremists, Partition of Bengal", priority:"high", prelims:9, mains:6, status:"live", file:"../modern-mod3-revolt-nationalism-upsc-notes.html", readTime:22, tags:["1857","Sepoy Mutiny","INC","Moderates","Extremists","Swadeshi"] },
      { id:"modern-mod4", title:"Gandhi Era & Mass Movements", sub:"Mod 4: Non-Cooperation, Civil Disobedience, Quit India, Round Table", priority:"high", prelims:10, mains:7, status:"live", file:"../modern-mod4-gandhi-era-upsc-notes.html", readTime:24, tags:["Non-Cooperation","Dandi March","Civil Disobedience","Quit India","Gandhi"] },
      { id:"modern-mod5", title:"INA, Later Movements & Independence", sub:"Mod 5: INA, Bhagat Singh, HSRA, Cabinet Mission, Partition 1947", priority:"high", prelims:7, mains:5, status:"live", file:"../modern-mod5-ina-independence-upsc-notes.html", readTime:18, tags:["INA","Subhas Bose","Bhagat Singh","Cabinet Mission","Partition"] }
    ]
  },
  culture: {
    name: "Art, Culture & Heritage",
    icon: "🎭",
    paper: "GS Paper 1",
    description: "Temple architecture, classical arts, literature, philosophy, and intangible heritage of India",
    chapters: [
      { id:"culture-mod1", title:"Architecture & Sculpture", sub:"Mod 1: Temple styles, stupa, cave art, rock-cut, Indo-Islamic", priority:"high", prelims:8, mains:4, status:"coming-soon", readTime:20, tags:["Nagara","Dravidian","Vesara","Rock-cut","Stupa"] },
      { id:"culture-mod2", title:"Painting, Music, Dance & Theatre", sub:"Mod 2: Cave paintings, Mughal miniature, classical dance, music traditions", priority:"high", prelims:7, mains:3, status:"coming-soon", readTime:18, tags:["Ajanta","Mughal miniature","Bharatanatyam","Kathak","Carnatic"] },
      { id:"culture-mod3", title:"Literature, Philosophy & Festivals", sub:"Mod 3: Sanskrit literature, regional languages, philosophy, UNESCO ICH", priority:"medium", prelims:6, mains:3, status:"coming-soon", readTime:16, tags:["Sanskrit","Vedanta","Intangible Heritage","Kumbh Mela","Yoga"] }
    ]
  },
  geo: {
    name: "Indian Geography",
    icon: "🗺️",
    paper: "GS Paper 1",
    description: "Physical, economic, and human geography of India",
    chapters: [
      { id:"physiography", title:"Physiography of India", sub:"Himalayas, plains, plateaus, coastlines", priority:"medium", prelims:6, mains:3, status:"coming-soon", readTime:14, tags:["Himalayas","Deccan Plateau","Indo-Gangetic Plain","Coastline"] },
      { id:"climate", title:"Climate of India", sub:"Monsoon, seasons, rainfall patterns", priority:"high", prelims:8, mains:5, status:"coming-soon", readTime:16, tags:["Monsoon","El Nino","ITCZ","Western Disturbances"] },
      { id:"rivers", title:"Rivers & Water Bodies", sub:"Himalayan & Peninsular rivers, dams", priority:"high", prelims:8, mains:4, status:"coming-soon", readTime:14, tags:["Ganga","Brahmaputra","Krishna","Interlinking"] },
      { id:"soils-agriculture", title:"Soils & Agriculture", sub:"Soil types, crops, agricultural zones", priority:"high", prelims:7, mains:5, status:"coming-soon", readTime:14, tags:["Alluvial","Black soil","Red soil","Kharif","Rabi"] },
      { id:"mineral-energy", title:"Minerals & Energy Resources", sub:"Coal, petroleum, renewable energy", priority:"medium", prelims:6, mains:3, status:"coming-soon", readTime:12, tags:["Coal belts","Oil fields","Solar","Wind energy"] },
      { id:"population-urbanisation", title:"Population & Urbanisation", sub:"Census data, migration, smart cities", priority:"medium", prelims:5, mains:4, status:"coming-soon", readTime:12, tags:["Census 2011","Migration","Urbanisation","Smart Cities"] },
      { id:"disasters", title:"Natural Disasters & Management", sub:"Earthquakes, floods, cyclones, NDMA", priority:"high", prelims:6, mains:5, status:"coming-soon", readTime:14, tags:["NDMA","Earthquake zones","Cyclone","Tsunami"] }
    ]
  },
  worldgeo: {
    name: "World Geography",
    icon: "🌐",
    paper: "GS Paper 1",
    description: "Physical geography of the world — landforms, atmosphere, and oceans",
    chapters: [
      { id:"world-physical", title:"World Physical Geography", sub:"Continents, oceans, major landforms", priority:"medium", prelims:5, mains:3, status:"coming-soon", readTime:12, tags:["Continents","Oceans","Mountain ranges"] },
      { id:"geomorphology", title:"Geomorphology", sub:"Landform evolution, erosion, deposition", priority:"medium", prelims:5, mains:3, status:"coming-soon", readTime:12, tags:["Fluvial","Aeolian","Glacial","Karst"] },
      { id:"atmosphere", title:"Atmosphere & Climate", sub:"Atmospheric layers, winds, climate zones", priority:"medium", prelims:6, mains:3, status:"coming-soon", readTime:12, tags:["Troposphere","Jet Stream","Trade winds","Climate zones"] },
      { id:"oceanography", title:"Oceanography", sub:"Ocean currents, tides, marine resources", priority:"medium", prelims:5, mains:3, status:"coming-soon", readTime:10, tags:["Ocean currents","El Nino","Coral reefs","EEZ"] }
    ]
  },
  economy: {
    name: "Indian Economy",
    icon: "📈",
    paper: "GS Paper 3",
    description: "Development economics, fiscal policy, agriculture, trade, and financial systems",
    chapters: [
      { id:"economic-planning", title:"Economic Planning & Development", sub:"Five-year plans, NITI Aayog, vision 2047", priority:"medium", prelims:5, mains:4, status:"coming-soon", readTime:14, tags:["Five Year Plans","NITI Aayog","Vision 2047"] },
      { id:"growth-development", title:"Growth, Development & Poverty", sub:"GDP, HDI, poverty measures, inequality", priority:"medium", prelims:6, mains:5, status:"coming-soon", readTime:14, tags:["GDP","HDI","Poverty Line","Gini coefficient"] },
      { id:"fiscal-policy", title:"Fiscal Policy & Budget", sub:"Union Budget, taxation, deficit types", priority:"high", prelims:7, mains:5, status:"coming-soon", readTime:16, tags:["Union Budget","FRBM","Fiscal Deficit","Revenue Deficit"] },
      { id:"monetary-policy", title:"Monetary Policy & Banking", sub:"RBI, CRR, SLR, repo rate, inflation", priority:"high", prelims:8, mains:5, status:"coming-soon", readTime:16, tags:["RBI","Repo Rate","CRR","SLR","Inflation"] },
      { id:"agriculture-economy", title:"Agriculture & Food Security", sub:"MSP, PDS, crop insurance, PM-KISAN", priority:"high", prelims:7, mains:6, status:"coming-soon", readTime:16, tags:["MSP","PDS","PM-KISAN","Agricultural reforms"] },
      { id:"industries", title:"Industries & Manufacturing", sub:"Make in India, PLI, industrial policy", priority:"medium", prelims:5, mains:4, status:"coming-soon", readTime:14, tags:["Make in India","PLI","MSME","Industrial Corridors"] },
      { id:"trade", title:"International Trade & BoP", sub:"Exports, imports, WTO, trade agreements", priority:"high", prelims:6, mains:5, status:"coming-soon", readTime:14, tags:["WTO","Balance of Payments","FTA","Export promotion"] },
      { id:"financial-markets", title:"Financial Markets & Inclusion", sub:"Capital markets, SEBI, Jan Dhan", priority:"medium", prelims:6, mains:4, status:"coming-soon", readTime:14, tags:["SEBI","Jan Dhan","NBFCs","Mutual Funds"] },
      { id:"infrastructure", title:"Infrastructure Development", sub:"Roads, railways, ports, energy", priority:"medium", prelims:5, mains:4, status:"coming-soon", readTime:12, tags:["NIP","PM Gati Shakti","Sagarmala","Bharatmala"] },
      { id:"social-sector", title:"Social Sector & Human Development", sub:"Health, education, welfare schemes", priority:"medium", prelims:5, mains:5, status:"coming-soon", readTime:14, tags:["Ayushman Bharat","NEP 2020","MGNREGA","SDGs"] },
      { id:"gst-taxation", title:"GST & Taxation Reforms", sub:"GST structure, direct taxes, tax reforms", priority:"high", prelims:7, mains:4, status:"coming-soon", readTime:14, tags:["GST","GST Council","Direct Tax","Income Tax"] }
    ]
  },
  environment: {
    name: "Environment & Ecology",
    icon: "🌿",
    paper: "GS Paper 3",
    description: "Biodiversity, climate change, environmental law, and sustainability",
    chapters: [
      { id:"biodiversity", title:"Biodiversity & Conservation", sub:"Hotspots, protected areas, IUCN, CBD", priority:"high", prelims:8, mains:5, status:"coming-soon", readTime:16, tags:["Biodiversity Hotspots","IUCN","CBD","Protected Areas"] },
      { id:"climate-change", title:"Climate Change & Global Warming", sub:"UNFCCC, Paris Agreement, NDC, IPCC", priority:"high", prelims:7, mains:6, status:"coming-soon", readTime:16, tags:["Paris Agreement","NDC","IPCC","Carbon Credits"] },
      { id:"environment-law", title:"Environmental Laws & Policies", sub:"EPA, Forest Act, EIA, NGT", priority:"high", prelims:7, mains:5, status:"coming-soon", readTime:14, tags:["EPA 1986","Forest Act","EIA","NGT"] },
      { id:"pollution", title:"Pollution & Waste Management", sub:"Air, water, soil, solid waste management", priority:"medium", prelims:6, mains:4, status:"coming-soon", readTime:14, tags:["Air pollution","CPCB","Solid waste","Plastic ban"] },
      { id:"ecosystem", title:"Ecosystem & Food Chains", sub:"Types, functions, services, restoration", priority:"medium", prelims:6, mains:3, status:"coming-soon", readTime:12, tags:["Food chain","Ecosystem services","Wetlands","Mangroves"] },
      { id:"international-env", title:"International Environmental Conventions", sub:"CITES, Ramsar, Montreal Protocol", priority:"high", prelims:7, mains:4, status:"coming-soon", readTime:14, tags:["CITES","Ramsar","Montreal Protocol","UNCCD"] }
    ]
  },
  science: {
    name: "Science & Technology",
    icon: "🔬",
    paper: "GS Paper 3",
    description: "Space, defence, biotechnology, IT, and nuclear technology",
    chapters: [
      { id:"space-isro", title:"Space Technology & ISRO", sub:"Missions, PSLV, GSLV, Chandrayaan, Gaganyaan", priority:"high", prelims:8, mains:4, status:"coming-soon", readTime:14, tags:["ISRO","Chandrayaan","Gaganyaan","PSLV","GSLV"] },
      { id:"defence-tech", title:"Defence Technology", sub:"DRDO, missiles, indigenisation, drones", priority:"medium", prelims:5, mains:3, status:"coming-soon", readTime:12, tags:["DRDO","BrahMos","Tejas","Drones"] },
      { id:"biotech", title:"Biotechnology & Agriculture", sub:"GM crops, CRISPR, vaccines, biosafety", priority:"medium", prelims:6, mains:4, status:"coming-soon", readTime:14, tags:["GM crops","CRISPR","Bt cotton","GEAC"] },
      { id:"it-cyber", title:"IT, AI & Cybersecurity", sub:"AI policy, data protection, cyber laws", priority:"high", prelims:6, mains:5, status:"coming-soon", readTime:14, tags:["AI","DPDP Act","Cybersecurity","Digital India"] },
      { id:"nuclear", title:"Nuclear Technology & Energy", sub:"Nuclear doctrine, reactors, NSG", priority:"medium", prelims:5, mains:3, status:"coming-soon", readTime:12, tags:["Nuclear Doctrine","NSG","IAEA","Thorium"] }
    ]
  },
  ir: {
    name: "International Relations",
    icon: "🌍",
    paper: "GS Paper 2",
    description: "India's foreign policy, bilateral relations, and global institutions",
    chapters: [
      { id:"india-foreign-policy", title:"India's Foreign Policy", sub:"Non-alignment, strategic autonomy, Neighbourhood First", priority:"high", prelims:6, mains:6, status:"coming-soon", readTime:16, tags:["NAM","Neighbourhood First","Act East","Strategic Autonomy"] },
      { id:"bilateral-relations", title:"Bilateral Relations", sub:"USA, China, Russia, Pakistan, neighbours", priority:"high", prelims:5, mains:6, status:"coming-soon", readTime:18, tags:["India-China","India-US","India-Pakistan","SAARC"] },
      { id:"multilateral", title:"Multilateral Institutions", sub:"UN, WTO, IMF, World Bank, BRICS, SCO", priority:"high", prelims:7, mains:5, status:"coming-soon", readTime:16, tags:["UN","WTO","BRICS","SCO","G20"] },
      { id:"geopolitics", title:"Geopolitics & Regional Issues", sub:"Indo-Pacific, Arctic, South China Sea", priority:"high", prelims:5, mains:6, status:"coming-soon", readTime:16, tags:["Indo-Pacific","QUAD","Arctic","South China Sea"] }
    ]
  },
  governance: {
    name: "Governance & Social Justice",
    icon: "🏛️",
    paper: "GS Paper 2",
    description: "Government schemes, social justice, health, education, and transparency",
    chapters: [
      { id:"e-governance", title:"E-Governance & Digital India", sub:"Digital India, DBT, e-services", priority:"medium", prelims:5, mains:5, status:"coming-soon", readTime:14, tags:["Digital India","DBT","Aadhaar","e-Governance"] },
      { id:"social-justice", title:"Social Justice & Welfare", sub:"SC/ST, OBC, minorities, gender justice", priority:"medium", prelims:5, mains:6, status:"coming-soon", readTime:14, tags:["Reservation","SC/ST Act","Women empowerment","Minority rights"] },
      { id:"health-education", title:"Health & Education Policy", sub:"NHM, Ayushman, NEP 2020, RTE", priority:"medium", prelims:5, mains:5, status:"coming-soon", readTime:14, tags:["NHM","Ayushman Bharat","NEP 2020","RTE"] },
      { id:"rti-transparency", title:"RTI, Transparency & Accountability", sub:"RTI Act, Lokpal, whistleblowers", priority:"medium", prelims:6, mains:4, status:"coming-soon", readTime:12, tags:["RTI Act","Lokpal","Whistleblower","Transparency"] }
    ]
  },
  security: {
    name: "Internal Security",
    icon: "🛡️",
    paper: "GS Paper 3",
    description: "Terrorism, border security, cyber threats, and security agencies",
    chapters: [
      { id:"terrorism-extremism", title:"Terrorism & Left-Wing Extremism", sub:"Naxalism, NE insurgency, counter-terrorism", priority:"high", prelims:5, mains:6, status:"coming-soon", readTime:14, tags:["Naxalism","UAPA","NIA","Counter-terrorism"] },
      { id:"border-management", title:"Border Management", sub:"Land borders, coastal security, BSF", priority:"medium", prelims:5, mains:5, status:"coming-soon", readTime:12, tags:["BSF","Coast Guard","ITBP","Border fencing"] },
      { id:"cyber-security-internal", title:"Cyber Security", sub:"Cyber threats, CERT-In, national policy", priority:"medium", prelims:5, mains:4, status:"coming-soon", readTime:12, tags:["CERT-In","Cyber threats","Dark web","Ransomware"] },
      { id:"security-agencies", title:"Security Agencies & Intelligence", sub:"RAW, IB, CBI, NIA, NSG", priority:"medium", prelims:6, mains:3, status:"coming-soon", readTime:12, tags:["RAW","IB","CBI","NIA","NSG"] }
    ]
  },
  ethics: {
    name: "Ethics GS4",
    icon: "🧭",
    paper: "GS Paper 4",
    description: "Ethics, integrity, and aptitude for civil services — Mains only paper",
    chapters: [
      { id:"ethics-topic01", title:"Ethics & Human Interface", sub:"Topic 01: Essence, determinants, dimensions of ethics, human values", priority:"high", prelims:0, mains:8, status:"live", readTime:50, tags:["Ethics","Morality","Human values","Kohlberg","Code of conduct"] },
      { id:"ethics-topic02", title:"Attitude & Social Influence", sub:"Topic 02: ABC model, cognitive dissonance, prejudice, attitude change", priority:"high", prelims:0, mains:6, status:"live", readTime:45, tags:["Attitude","Social influence","Prejudice","Cognitive dissonance"] },
      { id:"ethics-topic03", title:"Aptitude & Foundational Values for Civil Services", sub:"Topic 03: Integrity, impartiality, compassion, dedication to public service", priority:"high", prelims:0, mains:7, status:"live", readTime:45, tags:["Integrity","Impartiality","Compassion","Civil service values"] },
      { id:"ethics-topic04", title:"Emotional Intelligence", sub:"Topic 04: Goleman model, EI in governance and administration", priority:"high", prelims:0, mains:5, status:"live", readTime:40, tags:["EI","Goleman","Self-awareness","Empathy"] },
      { id:"ethics-topic05", title:"Indian Moral Thinkers & Philosophers", sub:"Topic 05: Gandhi, Ambedkar, Kautilya, Vivekananda, Tagore", priority:"high", prelims:0, mains:6, status:"live", readTime:50, tags:["Gandhi","Ambedkar","Kautilya","Vivekananda"] },
      { id:"ethics-topic06", title:"Western Moral Philosophers", sub:"Topic 06: Kant, Mill, Aristotle, Rawls, virtue ethics, utilitarianism", priority:"high", prelims:0, mains:6, status:"live", readTime:50, tags:["Kant","Mill","Aristotle","Rawls","Utilitarianism"] },
      { id:"ethics-topic07", title:"Public Administration Ethics & Corporate Governance", sub:"Topic 07: Codes of conduct, corporate governance, stakeholder theory", priority:"high", prelims:0, mains:6, status:"live", readTime:45, tags:["Corporate governance","Stakeholders","CSR","Public administration"] },
      { id:"ethics-topic08", title:"Probity in Governance", sub:"Topic 08: Integrity, accountability, RTI, whistleblowers, citizen charter", priority:"high", prelims:0, mains:7, status:"live", readTime:45, tags:["Probity","Integrity","RTI","Whistleblowers"] },
      { id:"ethics-topic09", title:"Case Study Frameworks & Answer Writing", sub:"Topic 09: Ethical dilemmas, decision frameworks, GS4 case studies", priority:"high", prelims:0, mains:10, status:"live", readTime:55, tags:["Case studies","Ethical dilemma","Answer writing","Stakeholder analysis"] }
    ]
  },
  current: {
    name: "Current Affairs Monthly",
    icon: "📰",
    paper: "All Papers",
    description: "Monthly current affairs compilations with UPSC relevance mapped to syllabus",
    chapters: [
      { id:"ca-may-2026", title:"Current Affairs — May 2026", sub:"Latest month: Parliament session, economic data, international events", priority:"high", prelims:15, mains:10, status:"coming-soon", readTime:35, tags:["May 2026","Parliament","Economy","International"] },
      { id:"ca-apr-2026", title:"Current Affairs — April 2026", sub:"Apr 2026: Elections, budget session, global events", priority:"high", prelims:14, mains:9, status:"coming-soon", readTime:35, tags:["April 2026","Budget","Elections","Foreign policy"] },
      { id:"ca-mar-2026", title:"Current Affairs — March 2026", sub:"Mar 2026: Supreme Court judgments, policy updates", priority:"high", prelims:12, mains:8, status:"coming-soon", readTime:30, tags:["March 2026","SC judgments","Policy","Environment"] },
      { id:"ca-feb-2026", title:"Current Affairs — February 2026", sub:"Feb 2026: Union Budget 2026-27, diplomacy", priority:"high", prelims:13, mains:9, status:"coming-soon", readTime:40, tags:["Union Budget","February 2026","Diplomacy","Technology"] },
      { id:"ca-jan-2026", title:"Current Affairs — January 2026", sub:"Jan 2026: New year policy announcements, summits", priority:"high", prelims:12, mains:8, status:"coming-soon", readTime:30, tags:["January 2026","G20","Policy","Economy"] },
      { id:"ca-jun-2025-dec-2025", title:"Current Affairs — Jun–Dec 2025", sub:"Second half 2025 compilation for UPSC 2026/27", priority:"high", prelims:20, mains:14, status:"coming-soon", readTime:40, tags:["2025 CA","Parliament","Economy","International"] },
      { id:"ca-2024-compilation", title:"Current Affairs — 2024 Full Year", sub:"Complete 2024 compilation — essential for UPSC 2026", priority:"high", prelims:25, mains:18, status:"coming-soon", readTime:40, tags:["2024 CA","Annual","Prelims","Mains revision"] }
    ]
  }
} as const;

export type SubjectKey = keyof typeof SYLLABUS_DATA;
