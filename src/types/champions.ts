import type {CHAMPION_MAP} from '../constants/champions';
import type {Position} from './shared';

export type ChampionId = keyof typeof CHAMPION_MAP;
export type ChampionName = typeof CHAMPION_MAP[keyof typeof CHAMPION_MAP]

export interface ParticipantFrame {
    championStats: {
        abilityHaste: number;
        abilityPower: number;
        armor: number;
        armorPen: number;
        armorPenPercent: number;
        attackDamage: number;
        attackSpeed: number;
        bonusArmorPenPercent: number;
        bonusMagicPenPercent: number;
        ccReduction: number;
        cooldownReduction: number;
        health: number;
        healthMax: number;
        healthRegen: number;
        lifesteal: number;
        magicPen: number;
        magicPenPercent: number;
        magicResist: number;
        movementSpeed: number;
        omnivamp: number;
        physicalVamp: number;
        power: number;
        powerMax: number;
        powerRegen: number;
        spellVamp: number;
    },
    currentGold: number;
    damageStats: {
        magicDamageDone: number;
        magicDamageDoneToChampions: number;
        magicDamageTaken: number;
        physicalDamageDone: number;
        physicalDamageDoneToChampions: number;
        physicalDamageTaken: number;
        totalDamageDone: number;
        totalDamageDoneToChampions: number;
        totalDamageTaken: number;
        trueDamageDone: number;
        trueDamageDoneToChampions: number;
        trueDamageTaken: number;
    },
    goldPerSecond: number;
    jungleMinionsKilled: number;
    level: number;
    minionsKilled: number;
    participantId: number;
    position: Position;
    timeEnemySpentControlled: number;
    totalGold: number;
    xp: number;
}
