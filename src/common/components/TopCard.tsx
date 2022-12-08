import React, { PropsWithChildren, ReactElement } from "react";
import { Link } from "react-router-dom";
import { ICardProperties } from "../types/TopCard.types";

function TopCard(props: PropsWithChildren<ICardProperties>): ReactElement {

    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <Link to={props.link} style={{textDecoration:'none'}}>
            <div className={`card border-left-${props.class} shadow h-100 py-2 `}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2" style={{paddingLeft: 10, textAlign: 'center'}}>
                            <div className="text-xs font-weight-bold text-uppercase mb-1"  style={{fontSize:20 , color:'#5a6adc'}}> {props.title}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800" style={{fontSize:22}}>{props.text}</div>
                        </div>
                        <div className="col-auto" >
                            <i className={`fas fa-${props.icon} fa-2x text-gray-300`} style={{paddingLeft:1, fontSize:60}}></i>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        </div>
    );
}
export default TopCard;
