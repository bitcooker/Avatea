import React from "react";
import Image from "next/image";
import moment from 'moment';

export default function TransactionItem(props) {
  return (
    <div className="actItem">
      <div className="actItem__image">
          <i className="fa-duotone fa-money-bill-transfer text-2xl"/>
        {/*<Image src={`/shapes/shapeChart.png`} alt={props.id} width={80} height={80} />*/}
      </div>
      <div className="actItem__content">
        <div className="actItem__content-info">
          {props.type}
          <small>{moment(props.timestamp).format('LLLL')}</small>
        </div>
        <div className="actItem__content-number">{props.amount} </div>
          <div>
              <a target={'_blank'} href={`https://rinkeby.etherscan.io/tx/${props.hash}`} rel={'noreferrer'}><i className="fa-solid fa-eye"/></a>
          </div>
      </div>
    </div>
  );
}
