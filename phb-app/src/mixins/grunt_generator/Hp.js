export const Hp = {
  methods: {
    setGruntHp(config, grunt) {
      let hpRange = this.createNumberRange(config.cr.hpMin, config.cr.hpMax);
      const oneQuarterOfRange = Math.floor(hpRange.length / 4);
      hpRange = hpRange.slice(oneQuarterOfRange, hpRange.length - oneQuarterOfRange);
      const targetTotal = this.randomValue(hpRange);

      // Base Shield Calcs
      let averageSpDieRoll = 2.5;
      let shieldPercent = 0.3;
      let targetSp = 0;
      let maxSp = 0;

      // Base HP calcs
      let targetHp = targetTotal;
      let maxHp = config.cr.hpMax;

      // Has Shields?
      const shields = Math.floor(Math.random() * 100) > 30;
      if (shields) {
        if (config.sc) {
          if (config.sc.id === 'engineer' || config.sc.id === 'infiltrator' || config.sc.id === 'sentinel') {
            averageSpDieRoll = 3.5;
            shieldPercent = 0.5;
          } else {
            shieldPercent = 0.4;
          }
        }
        targetSp = Math.floor(targetTotal * shieldPercent);
        maxSp = Math.floor(targetHp * shieldPercent);
        targetHp = targetTotal - targetSp;
        maxHp = config.cr.hpMax - maxSp;
      }

      const averageHpDieRoll = config.race.id === 'volus' ? 3.5 : 4.5;
      const conMod = this.abilityScoreBonus(grunt.abilityScores.con);
      let multiplicativeMod = 1;
      if (grunt.resistances || grunt.immunities) {
        if (parseInt(config.cr.cr, 10) < 5) {
          multiplicativeMod = 2;
        } else if (parseInt(config.cr.cr, 10) < 11) {
          multiplicativeMod = grunt.immunities ? 2 : 1.5;
        } else {
          multiplicativeMod = grunt.immunities ? 1.5 : 1.25;
        }
      }

      grunt.sp = shields ? this.generatePointObject(averageSpDieRoll, targetSp, maxSp, 0) : null;
      grunt.hp = this.generatePointObject(averageHpDieRoll, targetHp, maxHp, conMod, multiplicativeMod);
    },
    generatePointObject(avgRoll, targetAverage, maxPoints, additiveMod = 0, multiplicativeMod = 1) {
      let numDice = 0;
      let average = 0;
      let max = 0;
      const maxRoll = this.dieFromAverage(avgRoll);
      while (average <= targetAverage && max <= maxPoints) {
        numDice++;
        average = ((numDice * avgRoll) + (numDice * additiveMod)) * multiplicativeMod;
        max = numDice * maxRoll * multiplicativeMod;
      }
      return {
        avgRoll,
        average: Math.ceil(average),
        numDice,
        mod: additiveMod * numDice
      };
    }
  }
};
