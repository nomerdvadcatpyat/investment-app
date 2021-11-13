export enum Market {
    SHARES = 'shares',
    BONDS = 'bonds',
    FOREIGN_SHARES = 'foreignshares'
}

export const MARKET_OPTIONS = [
    {label: "Рынок акций", value: Market.SHARES, key: Market.SHARES},
    {label: "Рынок облигаций", value: Market.BONDS, key: Market.BONDS},
    {label: "Иностранные ц.б.", value: Market.FOREIGN_SHARES, key: Market.FOREIGN_SHARES}
];

export enum SharesBoard {
    TQBR = 'tqbr',
    TQTF = 'tqtf',
    TQTE = 'tqte',
    TQTD = 'tqtd',
    TQPI = 'tqpi',
    SMAL = 'smal',
    TQIF = 'tqif',
    TQFE = 'tqfe',
    TQFD = 'tqfd',
}

export enum BondsBoard {
    TQOB = 'tqob',
    TQCB = 'tqcb',
    TQRD = 'tqrd',
    TQIR = 'tqir',
    TQOD = 'tqod',
    TQOE = 'tqoe'
}

export enum ForeignSharesBoard {
    FQBR = 'fqbr'
}

export const BOARD_OPTIONS = {
    [Market.SHARES]: [
        { label: "TQBR", value: SharesBoard.TQBR, key: SharesBoard.TQBR },
        { label: "TQTF", value: SharesBoard.TQTF, key: SharesBoard.TQTF },
        { label: "TQTE", value: SharesBoard.TQTE, key: SharesBoard.TQTE },
        { label: "TQTD", value: SharesBoard.TQTD, key: SharesBoard.TQTD },
        { label: "TQPI", value: SharesBoard.TQPI, key: SharesBoard.TQPI },
        { label: "SMAL", value: SharesBoard.SMAL, key: SharesBoard.SMAL },
        { label: "TQIF", value: SharesBoard.TQIF, key: SharesBoard.TQIF },
        { label: "TQFE", value: SharesBoard.TQFE, key: SharesBoard.TQFE },
        { label: "TQFD", value: SharesBoard.TQFD, key: SharesBoard.TQFD }
    ],

    [Market.BONDS]: [
        { label: "TQOB", value: BondsBoard.TQOB, key: BondsBoard.TQOB },
        { label: "TQCB", value: BondsBoard.TQCB, key: BondsBoard.TQCB },
        { label: "TQRD", value: BondsBoard.TQRD, key: BondsBoard.TQRD },
        { label: "TQIR", value: BondsBoard.TQIR, key: BondsBoard.TQIR },
        { label: "TQOD", value: BondsBoard.TQOD, key: BondsBoard.TQOD },
        { label: "TQOE", value: BondsBoard.TQOE, key: BondsBoard.TQOE }
    ],

    [Market.FOREIGN_SHARES]: [
        { label: "FQBR", value: ForeignSharesBoard.FQBR, key: ForeignSharesBoard.FQBR }
    ]
};