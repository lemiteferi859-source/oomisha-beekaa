import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Calendar() {
  const { t, i18n } = useTranslation();
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState('all');

  const seasons = [
    {
      id: 'meher',
      nameEn: 'Meher Season (Main Harvest)',
      nameOm: 'Waqtii Meher (Ganna / Qonna Guddaa)',
      nameAm: 'መኸር ወቅት (ዋናው ምርት)',
      months: 'June – October / November',
      icon: '🌧️',
      descriptionEn: 'The primary crop season driven by the heavy summer Kiremt rains, producing over 85-90% of Ethiopia national cereal yields.',
      descriptionOm: 'Waqtii rooba gannaa isa guddaa irratti hundaahuun oomisha midhaanii biyyattii keessaa %85-90 kan maddisiisuudha.',
      descriptionAm: 'በክረምት ዝናብ ላይ የተመሰረተ ዋናው ወቅት ሲሆን የሀገሪቱን ከ85-90% የሚሆነውን እህል ያመርታል።',
      tips: [
        'Prepare deep plowing early in April/May before the heavy rains start.',
        'Select certified rust-resistant seeds for wheat and teff to prevent fungal loss.',
        'Construct drainage furrows on vertisol black soils to prevent waterlogging.'
      ]
    },
    {
      id: 'belg',
      nameEn: 'Belg Season (Secondary Harvest)',
      nameOm: 'Waqtii Belg (Arfaasaa)',
      nameAm: 'በልግ ወቅት (ሁለተኛው አነስተኛ ምርት)',
      months: 'February / March – May / June',
      icon: '🌦️',
      descriptionEn: 'Short rainy season essential for early maturing cereals, pulses, and fodder before the main Meher season.',
      descriptionOm: 'Waqtii rooba gabaabaa kan midhaan daddafanii gahaniif ooluudha.',
      descriptionAm: 'አጭር የዝናብ ወቅት ሲሆን ለአጭር ጊዜ ሰብሎችና ለአትክልት በጣም ወሳኝ ነው።',
      tips: [
        'Focus on short-cycle crops: Barley, haricot beans, lentils, and potatoes.',
        'Implement rain-water harvesting and micro-terraces.',
        'Scout regularly for early armyworm invasions.'
      ]
    },
    {
      id: 'bega',
      nameEn: 'Bega Season (Dry / Irrigation)',
      nameOm: 'Waqtii Bega (Bona / Jallisii)',
      nameAm: 'በጋ ወቅት (መስኖና ድህረ-ምርት)',
      months: 'October – January / February',
      icon: '☀️',
      descriptionEn: 'Post-harvest dry period ideal for teff threshing, coffee drying, and high-value vegetable production under irrigation.',
      descriptionOm: 'Waqtii bonaa kan oomisha haamuu, buna gogsuu fi qonna jallisiitiif mijataa tahe.',
      descriptionAm: 'የደረቅ ወቅት ሲሆን ምርት ለመሰብሰብ፣ ቡና ለማድረቅ እና በመስኖ አትክልት ለማምረት ምቹ ነው።',
      tips: [
        'Store grains in hermetic PICS bags to protect from weevils.',
        'Use drip or furrow irrigation early mornings or evenings to minimize evaporation.',
        'Spread organic mulch around root zones to conserve soil moisture.'
      ]
    }
  ];

  const cropSchedules = [
    {
      crop: 'Teff (Xaafee / ጤፍ)',
      season: 'meher',
      planting: 'Mid July – Early August',
      harvesting: 'November – December',
      regions: 'Adama, Bishoftu, Gojjam, Shewa',
      soil: 'Vertisols & Light soils',
      actionTips: 'Fine seedbed required; avoid deep sowing (0.5 - 1 cm).'
    },
    {
      crop: 'White Wheat (Qamadii / ስንዴ)',
      season: 'meher',
      planting: 'Late June – Mid July',
      harvesting: 'October – November',
      regions: 'Bale, Arsi, Shewa, Gojjam',
      soil: 'Well-drained loam',
      actionTips: 'Apply balanced DAP/Urea or NPSZnB fertilizer as per soil test.'
    },
    {
      crop: 'Red Maize (Boqqolloo / በቆሎ)',
      season: 'meher',
      planting: 'April – May (Long cycle) / June',
      harvesting: 'October – December',
      regions: 'Jimma, Wollega, Hawassa, West Gojjam',
      soil: 'Fertile deep loams',
      actionTips: 'Intercrop with Desmodium or legumes to ward off Fall Armyworm.'
    },
    {
      crop: 'Barley (Garbuu / ገብስ)',
      season: 'belg',
      planting: 'March – April (Belg) & July (Meher)',
      harvesting: 'June – July (Belg) & November (Meher)',
      regions: 'North Shewa, Bale highlands, Arsi',
      soil: 'Highland soils',
      actionTips: 'Tolerant to frost and acidity; optimal for altitude above 2,200m.'
    },
    {
      crop: 'Haricot Bean & Pulses (Baqela / ቦሎቄ)',
      season: 'belg',
      planting: 'March – April',
      harvesting: 'June – July',
      regions: 'Rift Valley, Central Oromia, Sidama',
      soil: 'Sandy loam',
      actionTips: 'Fixes atmospheric nitrogen into soil; ideal rotation before cereal crops.'
    },
    {
      crop: 'Arabica Coffee (Buna / ቡና)',
      season: 'bega',
      planting: 'June – August (Seedlings)',
      harvesting: 'October – January (Red cherry picking)',
      regions: 'Jimma, Nekemte, Sidama, Yirgacheffe, Keffa',
      soil: 'Volcanic forest soils',
      actionTips: 'Selective hand-picking of ripe red cherries only for Grade 1 export.'
    }
  ];

  const filteredCrops = cropSchedules.filter(c => {
    const seasonMatch = selectedSeason === 'all' || c.season === selectedSeason;
    const cropMatch = selectedCrop === 'all' || c.crop.toLowerCase().includes(selectedCrop.toLowerCase());
    return seasonMatch && cropMatch;
  });

  const getSeasonName = (season) => {
    if (i18n.language === 'om') return season.nameOm;
    if (i18n.language === 'am') return season.nameAm;
    return season.nameEn;
  };

  const getSeasonDesc = (season) => {
    if (i18n.language === 'om') return season.descriptionOm;
    if (i18n.language === 'am') return season.descriptionAm;
    return season.descriptionEn;
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-100 text-brandGreen font-bold text-xs px-3 py-1 rounded-full mb-2">
            <span>📅</span>
            <span>Ethiopian Agricultural Seasons (Meher, Belg & Bega)</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900">{t('Crop Calendar')}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Planting windows, harvesting cycles, and seasonal management advice tailored for Ethiopian farmers
          </p>
        </div>
        <Link
          to="/weather"
          className="bg-brandGreen hover:bg-green-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
        >
          <span>☀️</span>
          <span>{t('View Weather')}</span>
        </Link>
      </div>

      {/* Season Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {seasons.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelectedSeason(selectedSeason === s.id ? 'all' : s.id)}
            className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
              selectedSeason === s.id
                ? 'bg-green-50 border-brandGreen shadow-md ring-2 ring-brandGreen/20'
                : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-green-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {s.months}
                </span>
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">{getSeasonName(s)}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{getSeasonDesc(s)}</p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="text-[11px] font-bold text-brandGreen uppercase tracking-wider mb-1.5">Key Farmer Advisory:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {s.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-brandGreen text-xs font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Chips Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase mr-1">Filter Season:</span>
          <button
            onClick={() => setSelectedSeason('all')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition ${
              selectedSeason === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Seasons
          </button>
          <button
            onClick={() => setSelectedSeason('meher')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition ${
              selectedSeason === 'meher' ? 'bg-brandGreen text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🌧️ Meher
          </button>
          <button
            onClick={() => setSelectedSeason('belg')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition ${
              selectedSeason === 'belg' ? 'bg-yellow-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🌦️ Belg
          </button>
          <button
            onClick={() => setSelectedSeason('bega')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition ${
              selectedSeason === 'bega' ? 'bg-orange-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ☀️ Bega
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase">Crop:</span>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-brandGreen"
          >
            <option value="all">All Crops</option>
            <option value="Teff">Teff</option>
            <option value="Wheat">Wheat</option>
            <option value="Maize">Maize</option>
            <option value="Barley">Barley</option>
            <option value="Coffee">Coffee</option>
            <option value="Bean">Beans / Pulses</option>
          </select>
        </div>
      </div>

      {/* Crop Schedule Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50/70 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800">
            Ethiopian Crop Planting & Harvest Matrix ({filteredCrops.length} records)
          </h2>
          <span className="text-xs text-gray-400">Based on Ethiopian Institute of Agricultural Research (EIAR) baselines</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Season</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sowing / Planting</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Harvesting Period</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Major Zones</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Agronomic Advice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredCrops.map((c, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition">
                  <td className="px-6 py-4 font-black text-gray-900 whitespace-nowrap">
                    {c.crop}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      c.season === 'meher'
                        ? 'bg-green-100 text-brandGreen'
                        : c.season === 'belg'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {c.season}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-semibold whitespace-nowrap">
                    🌱 {c.planting}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-semibold whitespace-nowrap">
                    🌾 {c.harvesting}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    📍 {c.regions}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xs max-w-xs leading-relaxed">
                    {c.actionTips}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
