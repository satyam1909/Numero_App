import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chatbot from '../components/Chatbot';

interface NumerologyResult {
  lifePath: number;
  personality: number;
  destiny: number;
  chaldean: number;
  soulUrge: number;
  expression: number;
}

interface CareerSuggestion {
  title: string;
  description: string;
  icon: string;
  confidence: number;
}

interface YearlyForecast {
  year: number;
  theme: string;
  description: string;
  opportunities: string[];
  challenges: string[];
  advice: string;
}

interface LuckyElements {
  colors: string[];
  numbers: number[];
  days: string[];
  months: string[];
}

interface PersonalityAnalysis {
  numberFrequency: { [key: number]: number };
  missingNumbers: number[];
  dominantNumbers: number[];
  weakNumbers: number[];
  traits: {
    strengths: string[];
    weaknesses: string[];
    balance: string[];
    recommendations: string[];
  };
}

const Calculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [results, setResults] = useState<NumerologyResult | null>(null);
  const [error, setError] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const calculateLifePathNumber = (date: string) => {
    const numbers = date.replace(/\D/g, '');
    let sum = numbers.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  };

  const calculatePersonalityNumber = (name: string) => {
    const consonants = name.replace(/[aeiou]/gi, '').replace(/\s/g, '');
    let sum = consonants.split('').reduce((acc, char) => {
      const value = getLetterValue(char);
      return acc + value;
    }, 0);
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  };

  const calculateDestinyNumber = (name: string) => {
    let sum = name.replace(/\s/g, '').split('').reduce((acc, char) => {
      const value = getLetterValue(char);
      return acc + value;
    }, 0);
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  };

  const calculateChaldeanNumber = (name: string) => {
    const chaldeanValues: { [key: string]: number } = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 8, 'g': 3, 'h': 5, 'i': 1,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 7, 'p': 8, 'q': 1, 'r': 2,
      's': 3, 't': 4, 'u': 6, 'v': 6, 'w': 6, 'x': 5, 'y': 1, 'z': 7
    };
    let sum = name.replace(/\s/g, '').toLowerCase().split('').reduce((acc, char) => {
      return acc + (chaldeanValues[char] || 0);
    }, 0);
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  };

  const calculateSoulUrgeNumber = (name: string) => {
    const vowels = name.match(/[aeiou]/gi)?.join('') || '';
    let sum = vowels.split('').reduce((acc, char) => {
      const value = getLetterValue(char);
      return acc + value;
    }, 0);
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  };

  const calculateExpressionNumber = (name: string) => {
    let sum = name.replace(/\s/g, '').split('').reduce((acc, char) => {
      const value = getLetterValue(char);
      return acc + value;
    }, 0);
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  };

  const getLetterValue = (char: string): number => {
    const values: { [key: string]: number } = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    };
    return values[char.toLowerCase()] || 0;
  };

  // Lu Shu (Lo Shu) grid helpers
  const reduceToDigit = (num: number) => {
    let n = num;
    while (n > 9) {
      n = n.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
    }
    return n === 0 ? 0 : n;
  };

  const computeDriver = (date: string) => {
    const day = date ? new Date(date).getDate() : 0;
    return reduceToDigit(day);
  };

  const computeConductor = (date: string) => {
    const digits = date.replace(/\D/g, '');
    const sum = digits.split('').reduce((acc, d) => acc + parseInt(d), 0);
    return reduceToDigit(sum);
  };

  const getDobDigitCounts = (date: string) => {
    const counts: { [key: number]: number } = { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 };
    const digits = date.replace(/\D/g, '').split('');
    digits.forEach(d => {
      const n = parseInt(d);
      if (n >= 1 && n <= 9) counts[n] += 1;
    });
    return counts;
  };

  const getNameDigitCounts = (name: string) => {
    const counts: { [key: number]: number } = { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 };
    const letters = name.replace(/\s/g, '').split('');
    letters.forEach(ch => {
      const v = getLetterValue(ch);
      if (v >= 1 && v <= 9) counts[v] += 1;
    });
    return counts;
  };

  const buildLoShuMatrixOrder = () => {
    return [
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6]
    ];
  };

  const mergeCounts = (a: { [key: number]: number }, b: { [key: number]: number }) => {
    const res: { [key: number]: number } = { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 };
    for (let i = 1; i <= 9; i++) res[i] = (a[i] || 0) + (b[i] || 0);
    return res;
  };

  // Analyze personality based on Lu Shu grid principles (kept for textual insights)
  const analyzePersonalityTraits = (freq: { [key: number]: number }): PersonalityAnalysis => {
    const numberFrequency = { ...freq };
    const missingNumbers = Object.keys(numberFrequency).map(Number).filter(num => numberFrequency[num] === 0);
    const dominantNumbers = Object.keys(numberFrequency).map(Number).filter(num => numberFrequency[num] >= 2);
    const weakNumbers = Object.keys(numberFrequency).map(Number).filter(num => numberFrequency[num] === 1);

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const balance: string[] = [];
    const recommendations: string[] = [];

    missingNumbers.forEach(num => {
      const missingTraits = {
        1: { weakness: 'Lack of leadership and independence', balance: 'Develop self-confidence', recommendation: 'Take initiative and trust your abilities' },
        2: { weakness: 'Difficulty with cooperation and diplomacy', balance: 'Develop patience', recommendation: 'Practice listening and compromise' },
        3: { weakness: 'Limited creative expression', balance: 'Develop communication skills', recommendation: 'Express yourself more openly' },
        4: { weakness: 'Lack of stability and organization', balance: 'Develop discipline', recommendation: 'Create structure and routines' },
        5: { weakness: 'Resistance to change and adventure', balance: 'Develop adaptability', recommendation: 'Embrace new experiences' },
        6: { weakness: 'Difficulty with love and responsibility', balance: 'Develop nurturing qualities', recommendation: 'Focus on relationships and service' },
        7: { weakness: 'Limited spiritual awareness', balance: 'Develop intuition', recommendation: 'Practice meditation and self-reflection' },
        8: { weakness: 'Lack of material success drive', balance: 'Develop ambition', recommendation: 'Set clear goals and work systematically' },
        9: { weakness: 'Limited compassion and universal love', balance: 'Develop empathy', recommendation: 'Practice kindness and service to others' }
      } as any;
      const trait = (missingTraits as any)[num];
      weaknesses.push(trait.weakness);
      balance.push(trait.balance);
      recommendations.push(trait.recommendation);
    });

    dominantNumbers.forEach(num => {
      const dominantTraits = {
        1: { strength: 'Strong leadership and independence', balance: 'May be too controlling', recommendation: 'Lead with humility and listen to others' },
        2: { strength: 'Excellent cooperation and diplomacy', balance: 'May be too dependent', recommendation: 'Maintain individuality while cooperating' },
        3: { strength: 'Creative expression and communication', balance: 'May be scattered', recommendation: 'Channel creativity into focused projects' },
        4: { strength: 'Stability and practical organization', balance: 'May be too rigid', recommendation: 'Stay organized but remain flexible' },
        5: { strength: 'Adaptability and love for change', balance: 'May be restless', recommendation: 'Embrace change but keep some structure' },
        6: { strength: 'Nurturing and responsible nature', balance: 'May be over-responsible', recommendation: 'Care for others but set boundaries' },
        7: { strength: 'Spiritual awareness and wisdom', balance: 'May be too introspective', recommendation: 'Develop spirituality while staying connected' },
        8: { strength: 'Material success and ambition', balance: 'May be too materialistic', recommendation: 'Pursue success with ethical values' },
        9: { strength: 'Compassion and universal love', balance: 'May be too idealistic', recommendation: 'Serve others while caring for yourself' }
      } as any;
      const trait = (dominantTraits as any)[num];
      strengths.push(trait.strength);
      balance.push(trait.balance);
      recommendations.push(trait.recommendation);
    });

    const totalNumbers = Object.values(numberFrequency).reduce((sum, count) => sum + count, 0);
    const uniqueNumbers = Object.values(numberFrequency).filter(count => count > 0).length;
    if (uniqueNumbers >= 7) {
      balance.push('Well-rounded personality with good number distribution');
    } else if (uniqueNumbers <= 3) {
      balance.push('Focused personality with concentrated energy');
      recommendations.push('Consider developing missing aspects of your personality');
    }
    if (totalNumbers > 8) {
      balance.push('High energy personality with strong numerological influence');
    } else if (totalNumbers < 4) {
      balance.push('Subtle energy personality with gentle influence');
      recommendations.push('Work on developing stronger numerological foundations');
    }

    return { numberFrequency, missingNumbers, dominantNumbers, weakNumbers, traits: { strengths, weaknesses, balance, recommendations } };
  };

  // NLP-like analysis for career predictions
  const analyzeCareerPatterns = (results: NumerologyResult): CareerSuggestion[] => {
    const lifePathTraits: { [key: number]: any } = {
      1: { leadership: 0.9, independence: 0.8, creativity: 0.7 },
      2: { cooperation: 0.9, diplomacy: 0.8, balance: 0.7 },
      3: { expression: 0.9, optimism: 0.8, communication: 0.8 },
      4: { stability: 0.9, hardwork: 0.8, practicality: 0.8 },
      5: { freedom: 0.9, change: 0.8, adventure: 0.8 },
      6: { love: 0.9, responsibility: 0.8, nurturing: 0.8 },
      7: { spirituality: 0.9, analysis: 0.8, wisdom: 0.8 },
      8: { power: 0.9, abundance: 0.8, material: 0.8 },
      9: { compassion: 0.9, humanitarian: 0.8, universal: 0.8 }
    };

    const personalityTraits: { [key: number]: any } = {
      1: { assertive: 0.8, confident: 0.7 },
      2: { diplomatic: 0.8, cooperative: 0.7 },
      3: { expressive: 0.8, charismatic: 0.7 },
      4: { reliable: 0.8, structured: 0.7 },
      5: { adaptable: 0.8, versatile: 0.7 },
      6: { caring: 0.8, supportive: 0.7 },
      7: { analytical: 0.8, introspective: 0.7 },
      8: { authoritative: 0.8, ambitious: 0.7 },
      9: { compassionate: 0.8, idealistic: 0.7 }
    };

    const expressionTraits: { [key: number]: any } = {
      1: { direct: 0.8, innovative: 0.7 },
      2: { collaborative: 0.8, mediating: 0.7 },
      3: { creative: 0.8, inspiring: 0.7 },
      4: { systematic: 0.8, thorough: 0.7 },
      5: { dynamic: 0.8, persuasive: 0.7 },
      6: { nurturing: 0.8, harmonious: 0.7 },
      7: { intellectual: 0.8, insightful: 0.7 },
      8: { powerful: 0.8, strategic: 0.7 },
      9: { humanitarian: 0.8, inspiring: 0.7 }
    };

    const lifePathTrait = lifePathTraits[results.lifePath] || lifePathTraits[1];
    const personalityTrait = personalityTraits[results.personality] || personalityTraits[1];
    const expressionTrait = expressionTraits[results.expression] || expressionTraits[1];

    const careerSuggestions: CareerSuggestion[] = [];

    if (lifePathTrait.leadership > 0.7 && personalityTrait.assertive > 0.7) {
      careerSuggestions.push({ title: 'Entrepreneur', description: 'Strong leadership and independence traits detected', icon: '🚀', confidence: 0.85 });
    }
    if (expressionTrait.creative > 0.7 || lifePathTrait.creativity > 0.7) {
      careerSuggestions.push({ title: 'Creative Director', description: 'Natural creative expression and communication abilities', icon: '🎨', confidence: 0.80 });
    }
    if (expressionTrait.intellectual > 0.7 || personalityTrait.analytical > 0.7) {
      careerSuggestions.push({ title: 'Data Scientist', description: 'Strong analytical and research capabilities identified', icon: '📊', confidence: 0.82 });
    }
    if (lifePathTrait.love > 0.7 || personalityTrait.caring > 0.7) {
      careerSuggestions.push({ title: 'Healthcare Professional', description: 'Natural nurturing and care-giving abilities', icon: '🏥', confidence: 0.78 });
    }
    if (lifePathTrait.power > 0.7 || expressionTrait.powerful > 0.7) {
      careerSuggestions.push({ title: 'Business Executive', description: 'Strong leadership and material success orientation', icon: '💼', confidence: 0.83 });
    }
    if (expressionTrait.inspiring > 0.7 || personalityTrait.expressive > 0.7) {
      careerSuggestions.push({ title: 'Marketing Specialist', description: 'Excellent communication and persuasion skills', icon: '📢', confidence: 0.79 });
    }

    if (careerSuggestions.length === 0) {
      const generalCareers = [
        { title: 'Project Manager', description: 'Balanced leadership and organizational skills', icon: '📋', confidence: 0.75 },
        { title: 'Consultant', description: 'Versatile problem-solving abilities', icon: '💡', confidence: 0.72 },
        { title: 'Team Leader', description: 'Collaborative and supportive nature', icon: '👥', confidence: 0.70 }
      ];
      careerSuggestions.push(...generalCareers);
    }

    return careerSuggestions.slice(0, 3);
  };

  const getYearlyForecast = (results: NumerologyResult): YearlyForecast => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const personalYear = calculatePersonalYear(results.lifePath, nextYear);
    
    const forecasts: { [key: number]: YearlyForecast } = {
      1: {
        year: nextYear,
        theme: 'New Beginnings & Leadership',
        description: 'A year of fresh starts, independence, and taking charge of your destiny.',
        opportunities: [
          'Starting new projects or businesses',
          'Taking on leadership roles',
          'Making important decisions',
          'Building self-confidence'
        ],
        challenges: [
          'Managing impatience and impulsiveness',
          'Balancing independence with cooperation',
          'Avoiding being too controlling'
        ],
        advice: 'Focus on your goals with determination, but remember to listen to others and maintain humility.'
      },
      2: {
        year: nextYear,
        theme: 'Partnership & Cooperation',
        description: 'A year focused on relationships, diplomacy, and working with others.',
        opportunities: [
          'Strengthening partnerships and relationships',
          'Developing patience and diplomacy',
          'Finding balance in life',
          'Building trust with others'
        ],
        challenges: [
          'Dealing with sensitivity and mood swings',
          'Avoiding dependency on others',
          'Maintaining personal boundaries'
        ],
        advice: "Embrace cooperation and partnerships, but don't lose your individuality in the process."
      },
      3: {
        year: nextYear,
        theme: 'Creativity & Expression',
        description: 'A year of artistic expression, communication, and social connections.',
        opportunities: [
          'Expressing creativity and talents',
          'Improving communication skills',
          'Building social networks',
          'Finding joy and optimism'
        ],
        challenges: [
          'Managing scattered energy and focus',
          'Avoiding superficiality',
          'Balancing fun with responsibility'
        ],
        advice: 'Let your creativity flow and share your talents with the world, but stay grounded.'
      },
      4: {
        year: nextYear,
        theme: 'Hard Work & Foundation',
        description: 'A year of building solid foundations, discipline, and practical achievements.',
        opportunities: [
          'Building strong foundations',
          'Developing discipline and organization',
          'Achieving practical goals',
          'Gaining stability and security'
        ],
        challenges: [
          'Avoiding rigidity and stubbornness',
          'Managing stress and overwork',
          'Finding work-life balance'
        ],
        advice: 'Work hard and build solid foundations, but remember to take breaks and stay flexible.'
      },
      5: {
        year: nextYear,
        theme: 'Change & Adventure',
        description: 'A year of freedom, travel, and embracing new experiences.',
        opportunities: [
          'Exploring new opportunities',
          'Traveling and experiencing new places',
          'Embracing change and flexibility',
          'Developing adaptability'
        ],
        challenges: [
          'Managing restlessness and impulsiveness',
          'Avoiding scattered focus',
          'Finding stability amid change'
        ],
        advice: 'Embrace change and adventure, but maintain some structure and discipline.'
      },
      6: {
        year: nextYear,
        theme: 'Love & Responsibility',
        description: 'A year focused on relationships, family, and service to others.',
        opportunities: [
          'Strengthening family bonds',
          'Finding love or deepening relationships',
          'Helping and serving others',
          'Creating harmony in life'
        ],
        challenges: [
          'Avoiding over-responsibility',
          'Managing emotional sensitivity',
          'Balancing giving with receiving'
        ],
        advice: "Focus on love and service, but don't neglect your own needs and boundaries."
      },
      7: {
        year: nextYear,
        theme: 'Spirituality & Wisdom',
        description: 'A year of introspection, learning, and spiritual growth.',
        opportunities: [
          'Deepening spiritual understanding',
          'Learning and gaining wisdom',
          'Developing intuition',
          'Finding inner peace'
        ],
        challenges: [
          'Avoiding isolation and withdrawal',
          'Managing perfectionism',
          'Balancing spirituality with practicality'
        ],
        advice: 'Focus on inner growth and wisdom, but stay connected with the world around you.'
      },
      8: {
        year: nextYear,
        theme: 'Power & Achievement',
        description: 'A year of material success, authority, and achieving goals.',
        opportunities: [
          'Achieving career and financial goals',
          'Gaining authority and recognition',
          'Building wealth and success',
          'Developing leadership skills'
        ],
        challenges: [
          'Managing power responsibly',
          'Avoiding materialism',
          'Balancing work with personal life'
        ],
        advice: 'Focus on achievement and success, but use your power wisely and ethically.'
      },
      9: {
        year: nextYear,
        theme: 'Completion & Universal Love',
        description: 'A year of endings, humanitarian work, and spiritual completion.',
        opportunities: [
          'Completing important projects',
          'Helping others and humanitarian work',
          'Developing compassion',
          'Finding spiritual fulfillment'
        ],
        challenges: [
          'Letting go of the past',
          'Managing emotional sensitivity',
          'Avoiding martyrdom'
        ],
        advice: 'Focus on completion and service, but remember to take care of yourself too.'
      }
    };

    return forecasts[personalYear] || forecasts[1];
  };

  const calculatePersonalYear = (lifePath: number, year: number): number => {
    const yearSum = year.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    const personalYear = lifePath + yearSum;
    return personalYear > 9 ? personalYear.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0) : personalYear;
  };

  const getLuckyElements = (results: NumerologyResult): LuckyElements => {
    const luckyElements: { [key: number]: LuckyElements } = {
      1: { colors: ['Red', 'Orange', 'Gold'], numbers: [1, 10, 19, 28], days: ['Sunday', 'Tuesday'], months: ['January', 'October'] },
      2: { colors: ['White', 'Silver', 'Light Blue'], numbers: [2, 11, 20, 29], days: ['Monday', 'Wednesday'], months: ['February', 'November'] },
      3: { colors: ['Yellow', 'Orange', 'Pink'], numbers: [3, 12, 21, 30], days: ['Tuesday', 'Thursday'], months: ['March', 'December'] },
      4: { colors: ['Green', 'Brown', 'Navy Blue'], numbers: [4, 13, 22, 31], days: ['Wednesday', 'Friday'], months: ['April', 'July'] },
      5: { colors: ['Blue', 'Purple', 'Gray'], numbers: [5, 14, 23, 32], days: ['Thursday', 'Saturday'], months: ['May', 'September'] },
      6: { colors: ['Pink', 'Rose', 'Light Green'], numbers: [6, 15, 24, 33], days: ['Friday', 'Sunday'], months: ['June', 'August'] },
      7: { colors: ['Purple', 'Violet', 'Indigo'], numbers: [7, 16, 25, 34], days: ['Saturday', 'Monday'], months: ['July', 'January'] },
      8: { colors: ['Gold', 'Yellow', 'Orange'], numbers: [8, 17, 26, 35], days: ['Sunday', 'Tuesday'], months: ['August', 'October'] },
      9: { colors: ['White', 'Gold', 'Crimson'], numbers: [9, 18, 27, 36], days: ['Monday', 'Wednesday'], months: ['September', 'December'] }
    };
    return luckyElements[results.lifePath] || luckyElements[1];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!birthDate || !fullName.trim()) {
      setError('Please enter both your birth date and full name');
      return;
    }

    try {
      const result: NumerologyResult = {
        lifePath: calculateLifePathNumber(birthDate),
        personality: calculatePersonalityNumber(fullName),
        destiny: calculateDestinyNumber(fullName),
        chaldean: calculateChaldeanNumber(fullName),
        soulUrge: calculateSoulUrgeNumber(fullName),
        expression: calculateExpressionNumber(fullName)
      };
      setResults(result);
    } catch (err) {
      setError('Please enter valid information');
    }
  };

  const numberDescriptions = {
    lifePath: "Your life's purpose and natural path",
    personality: 'How others see you and your outer personality',
    destiny: "Your life's purpose and the path you're meant to follow",
    chaldean: 'Ancient system using different number values for letters',
    soulUrge: 'Your inner desires, motivations, and what truly makes you happy',
    expression: 'Your natural talents, abilities, and how you express yourself'
  };

  const loShuOrder = buildLoShuMatrixOrder();

  const dobCounts = birthDate ? getDobDigitCounts(birthDate) : { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 };
  const nameCounts = fullName ? getNameDigitCounts(fullName) : { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 };
  const combinedCounts = mergeCounts(dobCounts, nameCounts);

  const driver = birthDate ? computeDriver(birthDate) : 0;
  const conductor = birthDate ? computeConductor(birthDate) : 0;
  const nameNumber = fullName ? calculateExpressionNumber(fullName) : 0;
  const dobDigitsRaw = birthDate ? birthDate.replace(/\D/g, '').split('').join(' ') : '';

  const personalityFromDob = analyzePersonalityTraits(dobCounts);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="text-6xl mb-4">🧮</div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">AI-Powered Numerology Calculator</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Enter your birth date and full name to discover your complete numerology profile with AI-enhanced career predictions and yearly forecast.</p>
        </motion.div>
      </div>
      
      <div className="card p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="birthDate" className="block text-lg font-semibold text-gray-700 mb-3">📅 Enter your birth date</label>
            <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="input text-lg" placeholder="Select your birth date" />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700 mb-3">✍️ Enter your full name</label>
            <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input text-lg" placeholder="Enter your full name (e.g., John Doe)" />
          </div>

          {error && (
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">⚠️ {error}</motion.p>
          )}

          <motion.button type="submit" className="btn btn-primary w-full text-xl py-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>🤖 Calculate My AI Numerology Profile</motion.button>
        </form>
      </div>

      {results && (
        <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="mt-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-3xl font-bold mb-4">Your AI-Enhanced Numerology Profile</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(results).map(([key, value], index) => (
              <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} className="card p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-3">
                  {key === 'lifePath' && '🎯'}
                  {key === 'personality' && '👤'}
                  {key === 'destiny' && '🌟'}
                  {key === 'chaldean' && '🏛️'}
                  {key === 'soulUrge' && '💝'}
                  {key === 'expression' && '🎨'}
                </div>
                <h4 className="text-lg font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <div className="text-4xl font-bold gradient-text mb-3">{value}</div>
                <p className="text-sm text-gray-600">{numberDescriptions[key as keyof typeof numberDescriptions]}</p>
              </motion.div>
            ))}
          </div>

          {/* Lu Shu Grid Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card p-8 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6">🧭 Lu Shu Grid (Based on DOB)</h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3">
                  <div className="px-3 py-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-700">Driver: <span className="font-semibold">{driver}</span></div>
                  <div className="px-3 py-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700">Conductor: <span className="font-semibold">{conductor}</span></div>
                  <div className="px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">Name Number: <span className="font-semibold">{nameNumber}</span></div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">All DOB digits:</span> <span className="ml-2">{dobDigitsRaw}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <div className="mb-2 font-medium">Legend</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center"><div className="w-3 h-3 rounded bg-red-200 border border-red-300 mr-2"></div> Missing (0)</div>
                  <div className="flex items-center"><div className="w-3 h-3 rounded bg-yellow-200 border border-yellow-300 mr-2"></div> Weak (1)</div>
                  <div className="flex items-center"><div className="w-3 h-3 rounded bg-green-200 border border-green-300 mr-2"></div> Strong (2+)</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              {loShuOrder.map((row, rIdx) => (
                <div key={rIdx} className="grid grid-cols-3 gap-3">
                  {row.map((cellNum) => {
                    const count = dobCounts[cellNum as keyof typeof dobCounts] || 0;
                    const bg = count === 0 ? 'bg-red-200 border-red-300 text-red-800' : count === 1 ? 'bg-yellow-200 border-yellow-300 text-yellow-800' : 'bg-green-200 border-green-300 text-green-800';
                    return (
                      <div key={cellNum} className={`p-4 rounded-xl border text-center ${bg}`}>
                        <div className="text-xs uppercase tracking-wide opacity-80">Number</div>
                        <div className="text-2xl font-bold">{cellNum}</div>
                        <div className="mt-1 text-xs">Count: {count}</div>
                        <div className="mt-1 text-sm font-medium tracking-wider">
                          {count > 0 ? Array(count).fill(cellNum).join(' ') : '—'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-600">💪 Strengths</h4>
                <ul className="space-y-2">
                  {personalityFromDob.traits.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">{strength}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-red-600">⚠️ Areas for Growth</h4>
                <ul className="space-y-2">
                  {personalityFromDob.traits.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start"><span className="text-red-500 mr-2">•</span><span className="text-gray-700">{weakness}</span></li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <div className="text-lg font-semibold mb-2 text-blue-600">⚖️ Balance</div>
                <ul className="space-y-1 text-sm">
                  {personalityFromDob.traits.balance.map((item, index) => (
                    <li key={index} className="text-gray-700">• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="text-lg font-semibold mb-2 text-green-600">💡 Recommendations</div>
                <ul className="space-y-1 text-sm">
                  {personalityFromDob.traits.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-3">Combined Grid (DOB + Name) - Counts Overview</h4>
              <div className="grid grid-cols-9 gap-2 text-center text-sm">
                {[1,2,3,4,5,6,7,8,9].map(n => (
                  <div key={n} className="p-2 rounded-lg bg-gray-100 border border-gray-200">
                    <div className="text-xs text-gray-500">{n}</div>
                    <div className="font-semibold">{combinedCounts[n as keyof typeof combinedCounts]}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Career Suggestions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="card p-8 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6">🤖 AI Career Path Analysis</h3>
            <p className="text-center text-gray-600 mb-6">Based on advanced pattern analysis of your numerology profile, here are AI-recommended career paths:</p>
            <div className="grid md:grid-cols-3 gap-6">
              {analyzeCareerPatterns(results).map((career, index) => (
                <motion.div key={career.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 + index * 0.1 }} className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <div className="text-3xl mb-2">{career.icon}</div>
                    <h4 className="font-semibold mb-2">{career.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{career.description}</p>
                    <div className="text-xs text-purple-600 font-medium">AI Confidence: {Math.round(career.confidence * 100)}%</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Yearly Forecast */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="card p-8 mb-8">
            <h3 className="text-2xl font-bold text-center mb-6">🔮 {getYearlyForecast(results).year} Yearly Forecast</h3>
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold gradient-text mb-2">{getYearlyForecast(results).theme}</h4>
              <p className="text-gray-600">{getYearlyForecast(results).description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-lg font-semibold mb-3 text-green-600">🌟 Opportunities</h5>
                <ul className="space-y-2">
                  {getYearlyForecast(results).opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start"><span className="text-green-500 mr-2">✓</span><span className="text-gray-700">{opportunity}</span></li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold mb-3 text-orange-600">⚠️ Challenges</h5>
                <ul className="space-y-2">
                  {getYearlyForecast(results).challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start"><span className="text-orange-500 mr-2">•</span><span className="text-gray-700">{challenge}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <h5 className="text-lg font-semibold mb-2 text-blue-600">💡 Advice for {getYearlyForecast(results).year}</h5>
              <p className="text-gray-700">{getYearlyForecast(results).advice}</p>
            </div>
          </motion.div>

          {/* Lucky Elements */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="card p-8">
            <h3 className="text-2xl font-bold text-center mb-6">🍀 Lucky Elements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="font-semibold mb-2">Lucky Colors</h4>
                <div className="space-y-1">
                  {getLuckyElements(results).colors.map((color, index) => (
                    <div key={index} className="text-sm text-gray-600">{color}</div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-3">🔢</div>
                <h4 className="font-semibold mb-2">Lucky Numbers</h4>
                <div className="space-y-1">
                  {getLuckyElements(results).numbers.map((number, index) => (
                    <div key={index} className="text-sm text-gray-600">{number}</div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-3">📅</div>
                <h4 className="font-semibold mb-2">Lucky Days</h4>
                <div className="space-y-1">
                  {getLuckyElements(results).days.map((day, index) => (
                    <div key={index} className="text-sm text-gray-600">{day}</div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-3">📆</div>
                <h4 className="font-semibold mb-2">Lucky Months</h4>
                <div className="space-y-1">
                  {getLuckyElements(results).months.map((month, index) => (
                    <div key={index} className="text-sm text-gray-600">{month}</div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* AI Chatbot */}
      <Chatbot userBirthDate={birthDate} numerologyData={results} isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(!isChatbotOpen)} />
    </motion.div>
  );
};

export default Calculator; 