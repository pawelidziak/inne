exports.damage = function(str) {
    str = str.toLowerCase();
    let spellStart = "fe";
    let spellEnd = "ai";
    
    // check if spell is correct
    if(!checkSpellCorrectness(str, spellStart, spellEnd)) return 0;
    
    // init variables 
    let start = str.indexOf(spellStart);
    let end = str.lastIndexOf(spellEnd);
    let spell = str.substring(start, end + spellEnd.length);
    let subStrings = [
        {spell: 'ne', power: 2},
        {spell: 'ai', power: 2},
        {spell: 'je', power: 2},
        {spell: 'jee', power: 3},
        {spell: 'ain', power: 3},
        {spell: 'dai', power: 5}
    ];

    // get substring with spells (between 'fe' and 'ai')
    let subSpells = spell.substring(spellStart.length, spell.length-spellEnd.length);

    /* find spells inside substring (Array) 
    and sort them by index and power (greater power first) */
    let spellFounded = findSpells(subStrings, subSpells);
    spellFounded.sort(sortSpells);

    let damage = calculate(subSpells, spellFounded)+3; // +3 because of 'fe' and 'ai'

    return damage > 0 ? damage : 0;
}

// metthod calculate final result
function calculate(str, array){
    let max = 0, tmpMax = 0;


    let newArray = array.slice(0);

    let newStr = str;

    for(let i = 0; i<newArray.length; i++){
        
        let power = 0;

        // if newStr includes spell then add power and cut string
        if(newStr.includes(newArray[i].spell)){
            power += newArray[i].power;
            newStr = newStr.replace(newArray[i].spell, '');    
            if(newStr.length === 0) return power;       
        }

        newArray.splice(i,1); //splice array

        // if newArray is empty
        if(newArray.length === 0){  
            power += -newStr.length;   
            return power; 
        } 

        // recursion
        power += calculate(newStr, newArray);
       
        tmpMax = power;
        newArray = array.slice(0);
        newStr = str;

        if(power > max) max = power;
        else max = tmpMax;
    }

    if(array.length === 0) return -str.length;

    return max;
}
// method sorts spells by index and power
function sortSpells(a, b){
  let first = a.index;
  let second = b.index; 
  return ((first < second) ? -1 : ((first > second) ? 1 : 0));
}

/* method method looks for all spells in substring 
    and returns found spells with their indexes */
function findSpells(spells, str){
    let result = new Array();
    let position = 0;
    for(let i = 0; i < spells.length; i++){
    
        // check how many spells is  
        while (true) {
            position = str.indexOf(spells[i].spell, position);
            if (position >= 0) {
                let tmp = {spell: spells[i].spell, power: spells[i].power, index: position};
                result.push(tmp);
                position += spells[i].spell.length;
            } else break;
        }
    }
    return result;
}

// method checks the correctness of the spell
function checkSpellCorrectness(str, start, end){
    let first_fa = str.indexOf(start)+2;
        
    if(str.split(start).length -1 == 1 && 
        str.lastIndexOf(end) != -1 && 
        str.indexOf(start, first_fa) == -1) return true;
    else return false;
}
