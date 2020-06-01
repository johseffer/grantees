import React from 'react'

//Bradesco (237), Caixa Econômica Federal 104), Sicoob ( 756) e Banco do Brasil (001)

import generalIcon from './images/general.png'
import bradescoIcon from './images/bradesco.png'
import caixaIcon from './images/caixa.png'
import sicoobIcon from './images/sicoob.png'

const bankSettings = {
    '001': {
        icon: generalIcon
    },
    '104': {
        icon: caixaIcon
    },
    '756': {
        icon: sicoobIcon
    },
    '237': {
        icon: bradescoIcon
    }
}

const BankIcon = (props) => {
    return <img src={bankSettings[props.bank].icon} alt="" width="24px" height="24px" />
}

export default BankIcon