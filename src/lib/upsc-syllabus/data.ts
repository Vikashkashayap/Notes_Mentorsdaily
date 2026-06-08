/** UPSC syllabus hub data — migrated from index.html */
export const SYLLABUS_DATA = {
  polity: {
    name: "Indian Polity & Constitution",
    icon: "⚖️",
    paper: "GS Paper 2",
    description: "Constitutional framework, democratic institutions, and governance structure of India",
    chapters: [
      { id:"polity-topic01", title:"Constitutional Framework", sub:"Topic 01: Historical Acts 1773–1947, Constituent Assembly, Drafting Committee", priority:"high", prelims:10, mains:6, status:"live", readTime:22, tags:["Regulating Act 1773","GoI Act 1935","Constituent Assembly","Ambedkar"] },
      { id:"polity-topic02", title:"Salient Features & Sources of the Constitution", sub:"Topic 02: Borrowed features, written constitution, federalism with unitary bias", priority:"high", prelims:8, mains:5, status:"live", readTime:20, tags:["Borrowed Features","Federal","Parliamentary","Rigid"] },
      { id:"polity-topic03", title:"Parts & Schedules of the Constitution", sub:"Topic 03: All 25 Parts and 12 Schedules — structure and amendments", priority:"high", prelims:9, mains:4, status:"live", readTime:22, tags:["7th Schedule","8th Schedule","10th Schedule","Anti-Defection"] },
      { id:"polity-topic04", title:"Preamble of the Constitution", sub:"Topic 04: Keywords, 42nd Amendment, Kesavananda, Berubari cases", priority:"high", prelims:7, mains:4, status:"live", readTime:18, tags:["Preamble","42nd Amendment","Kesavananda","Sovereign Socialist"] },
      { id:"polity-topic05", title:"Union and its Territory", sub:"Topic 05: Articles 1–4, States, UTs, reorganisation, integration of princely states", priority:"high", prelims:9, mains:5, status:"live", readTime:35, tags:["Art.1","Art.3","Art.4","J&K","Ladakh"] },
      { id:"polity-topic06", title:"Citizenship", sub:"Topic 06: Articles 5–11, Citizenship Act 1955, CAA, NRC, OCI", priority:"high", prelims:7, mains:4, status:"live", readTime:18, tags:["CAA","NRC","OCI","Single Citizenship"] },
      { id:"polity-topic07", title:"Fundamental Rights", sub:"Topic 07: Articles 12–35, six FRs, writ jurisdiction, landmark cases", priority:"high", prelims:12, mains:7, status:"live", readTime:28, tags:["Art.19","Art.21","Art.32","Writs","Maneka Gandhi"] },
      { id:"polity-topic08", title:"Directive Principles & Fundamental Duties", sub:"Topic 08: Articles 36–51 and 51A — DPSP vs FR, Swaran Singh Committee", priority:"high", prelims:8, mains:5, status:"live", readTime:20, tags:["DPSP","Fundamental Duties","Art.44","UCC"] },
      { id:"polity-topic09", title:"Amendment & Basic Structure Doctrine", sub:"Topic 09: Article 368, Golaknath, Kesavananda, Minerva Mills", priority:"high", prelims:9, mains:6, status:"live", readTime:20, tags:["Art.368","Basic Structure","Kesavananda","42nd Amendment"] },
      { id:"polity-topic10", title:"Parliament", sub:"Topic 10: Lok Sabha, Rajya Sabha, sessions, legislation, money bills", priority:"high", prelims:10, mains:6, status:"live", readTime:28, tags:["Lok Sabha","Rajya Sabha","Money Bill","Joint Sitting"] },
      { id:"polity-topic11", title:"President & Vice President", sub:"Topic 11: Election, powers, veto, ordinances, pardoning power", priority:"high", prelims:7, mains:4, status:"live", readTime:24, tags:["Pocket Veto","Ordinance","Art.356","Pardoning"] },
      { id:"polity-topic12", title:"Prime Minister, Cabinet & CoM", sub:"Topic 12: Council of Ministers, collective responsibility, Art.74–75", priority:"high", prelims:6, mains:5, status:"live", readTime:18, tags:["PM","Cabinet","Art.74","Art.75"] },
      { id:"polity-topic13", title:"Parliamentary & Federal System", sub:"Topic 13: Westminster model, quasi-federalism, cooperative federalism", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["Parliamentary","Federal","Unitary Bias","Cooperative Federalism"] },
      { id:"polity-topic14", title:"Centre-State Relations", sub:"Topic 14: Legislative, administrative, financial relations; inter-state", priority:"high", prelims:8, mains:7, status:"live", readTime:22, tags:["Art.246","7th Schedule","Finance Commission","Zonal Councils"] },
      { id:"polity-topic15", title:"Emergency Provisions", sub:"Topic 15: Articles 352, 356, 360 — national, state, financial emergency", priority:"high", prelims:8, mains:5, status:"live", readTime:20, tags:["Art.352","Art.356","President's Rule","Art.360"] },
      { id:"polity-topic16", title:"Governor, CM & State CoM", sub:"Topic 16: Governor's powers, CM, state council of ministers", priority:"high", prelims:7, mains:5, status:"live", readTime:20, tags:["Governor","Chief Minister","Art.163","Art.164"] },
      { id:"polity-topic17", title:"State Legislature", sub:"Topic 17: Vidhan Sabha, Vidhan Parishad, special provisions for states", priority:"high", prelims:7, mains:5, status:"live", readTime:22, tags:["Vidhan Sabha","Vidhan Parishad","Art.168","Special Provisions"] },
      { id:"polity-topic18", title:"UTs, Scheduled & Tribal Areas", sub:"Topic 18: Union Territories, Fifth & Sixth Schedule, tribal areas", priority:"high", prelims:7, mains:4, status:"live", readTime:22, tags:["Delhi UT","5th Schedule","6th Schedule","Tribal Areas"] },
      { id:"polity-topic19", title:"Panchayati Raj & Municipalities", sub:"Topic 19: 73rd & 74th Amendments, local self-government", priority:"high", prelims:6, mains:5, status:"live", readTime:22, tags:["73rd","74th","Panchayati Raj","Municipalities"] },
      { id:"polity-topic20", title:"Supreme Court", sub:"Topic 20: Composition, jurisdiction, judicial review, collegium", priority:"high", prelims:10, mains:7, status:"live", readTime:22, tags:["Supreme Court","Art.136","Collegium","Judicial Review"] },
      { id:"polity-topic21", title:"High Courts & Subordinate Courts", sub:"Topic 21: HC jurisdiction, subordinate judiciary, Lok Adalats", priority:"high", prelims:8, mains:5, status:"live", readTime:20, tags:["High Court","Subordinate Courts","Lok Adalat","Art.226"] },
      { id:"polity-topic22", title:"Judicial Review, Activism & PIL", sub:"Topic 22: PIL, judicial activism, NJAC, landmark judgments", priority:"high", prelims:9, mains:7, status:"live", readTime:22, tags:["PIL","Judicial Activism","NJAC","Kesavananda"] },
      { id:"polity-topic23", title:"UPSC & State Public Service Commissions", sub:"Topic 23: UPSC & State Public Service Commissions", priority:"high", prelims:8, mains:6, status:"live", readTime:20, tags:["Art.315","Art.316","Art.317","Art.318","Art.319","Art.320","Art.322","Art.323"] },
      { id:"polity-topic24", title:"Election Commission of India", sub:"Topic 24: Election Commission of India", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["Art. 324","CEC","Election Commission","Model Code of Conduct","MCC Non-statutory","2023 Appointment Act","NOTA — No Re-election","EVM"] },
      { id:"polity-topic25", title:"Finance Commission — Arts 280–281", sub:"Topic 25: Finance Commission", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["Art.280","Art.281","Art.275","Art.270","Divisible Pool","Vertical Devolution","Horizontal Devolution","15th FC — 41%"] },
      { id:"polity-topic26", title:"National Commissions for SC, ST, BC & Linguistic Minorities", sub:"Topic 26: National Commissions for SC, ST, BC & Linguistic Minorities", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["Art.338 NCSC","Art.338A NCST","Art.338B NCBC","Art.342A","Art.350B","89th Amendment 2003","102nd Amendment 2018","7th Amendment 1956"] },
      { id:"polity-topic27", title:"CAG, Attorney General & Advocate General", sub:"Topic 27: CAG, Attorney General & Advocate General", priority:"high", prelims:8, mains:6, status:"live", readTime:20, tags:["Art.148","Art.149","Art.150","Art.151","Art.76","Art.165","CAG Act 1971","CFI — Charged Expenditure"] },
      { id:"polity-topic28", title:"GST Council, NITI Aayog, Planning Commission & NDC", sub:"Topic 28: GST Council, NITI Aayog, Planning Commission & NDC", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["Art.279A","Art.246A","Art.269A","101st Amendment 2016","GST Council","1/3 Centre Weight","3/4 Majority","Dual GST (CGST+SGST)"] },
      { id:"polity-topic29", title:"NHRC, CVC, CBI, CIC & RTI Act 2005", sub:"Topic 29: NHRC, CVC, CBI, CIC & RTI", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["NHRC","CVC","CBI","CIC","RTI Act 2005","PHRA 1993","CVC Act 2003","DSPE Act 1946"] },
      { id:"polity-topic30", title:"Lokpal, Lokayuktas, NIA & Disaster Management", sub:"Topic 30: Lokpal, Lokayuktas, NIA & Disaster Management", priority:"high", prelims:8, mains:6, status:"live", readTime:20, tags:["Lokpal Act 2013","Statutory (NOT Constitutional)","50% Judicial Members","50% SC/ST/OBC/Women","Selection Committee","PM Jurisdiction Restrictions","Art. 105 — MP Privilege","Karnataka Lokayukta"] },
      { id:"polity-topic31", title:"NCW, NCM, NCDRC & Child Rights Commission", sub:"Topic 31: NCW, NCM, NCDRC & Child Rights Commission", priority:"high", prelims:8, mains:6, status:"live", readTime:20, tags:["NCW Act 1990","NCM Act 1992","CPCR Act 2005","Consumer Protection Act 2019","6 Minorities","Jain added 2014","NCDRC >₹10 Cr","Art.29"] },
      { id:"polity-topic32", title:"Regulatory Bodies — SEBI, TRAI, CCI, UGC, IRDAI & Co-operative Societies", sub:"Topic 32: Regulatory Bodies — SEBI, TRAI, CCI, UGC, IRDAI & Co-operative Societies", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["SEBI Act 1992","TRAI Act 1997","Competition Act 2002","UGC Act 1956","IRDAI Act 1999","PFRDA Act 2013","Quasi-legislative","Quasi-judicial"] },
      { id:"polity-topic33", title:"Official Language — Arts 343–351 & 8th Schedule", sub:"Topic 33: Official Language & 8th Schedule", priority:"high", prelims:8, mains:6, status:"live", readTime:20, tags:["Art.343","Art.344","Art.348","Art.350B","Art.351","8th Schedule","22 Languages","92nd Amdt 2003"] },
      { id:"polity-topic34", title:"Public Services, Tribunals & Rights/Liabilities of Government", sub:"Topic 34: Public Services, Tribunals & Rights/Liabilities of Government", priority:"high", prelims:8, mains:6, status:"live", readTime:20, tags:["Art.311","Art.310","Art.312","Art.323A","Art.323B","Doctrine of Pleasure","CAT","AT Act 1985"] },
      { id:"polity-topic35", title:"Special Provisions for Classes, Reservations & Elections", sub:"Topic 35: Special Provisions — Reservations & Elections", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["Art.330","Art.332","Art.334","Art.335","Art.340","Art.341","Art.342","Art.342A"] },
      { id:"polity-topic36", title:"Anti-Defection Law, Elections, Political Parties & Pressure Groups", sub:"Topic 36: Anti-Defection Law, Elections, Political Parties & Pressure Groups", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["10th Schedule","52nd Amendment 1985","91st Amendment 2003","2/3 Merger Rule","Split Abolished","Para 7 Struck Down","Kihoto Hollohan 1992","Nabam Rebia 2016"] },
      { id:"polity-topic37", title:"Landmark Judgements That Transformed India", sub:"Topic 37: Landmark Judgements That Transformed India", priority:"high", prelims:8, mains:6, status:"live", readTime:28, tags:["Basic Structure","Art.21","Art.368","Art.356","Kesavananda 1973","Maneka Gandhi 1978","SR Bommai 1994","KS Puttaswamy 2017"] },
      { id:"polity-topic38", title:"Important Articles, Amendments & Constitutional Reference", sub:"Topic 38: Articles, Amendments & Constitutional Reference", priority:"high", prelims:8, mains:6, status:"live", readTime:22, tags:["Art. 368","Art. 246","Art. 352–360","9th Schedule","Coelho 2007","106th Amdt","Three Lists","12 Schedules"] }
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
