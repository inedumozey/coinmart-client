import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Card({ data, type }) {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    return (
        <CardStyle type={type}>
            <div className="title">
                <div>
                    <div>{data.type?.toUpperCase()}</div>
                </div>
                <div className="line">
                    <div className="progres"></div>
                </div>
            </div>
            <div className="body">
                <div className="left">
                    <div style={{ marginBottom: '4px' }}>
                        <div style={{ fontWeight: 600 }}>Started</div>
                        <div style={{ fontSize: '.7rem' }}>
                            {month[new Date(data.createdAt).getMonth()]} {new Date(data.createdAt).getDate()}, {new Date(data.createdAt).getFullYear()}
                        </div>
                        <div style={{ fontSize: '.7rem' }}>
                            {new Date(data.createdAt).getHours()} : {new Date(data.createdAt).getMinutes()} : {new Date(data.createdAt).getSeconds()
                            }</div>
                    </div>
                    <div>
                        <div style={{ fontWeight: 600 }}>Amount</div>
                        <div style={{ fontSize: '.7rem' }}>{data.amount?.toFixed(2)} {data.currency}</div>
                    </div>
                </div>
                <div className="right">
                    <div style={{ marginBottom: '4px' }}>
                        <div style={{ fontWeight: 600 }}>{type == "active" ? "Matures" : 'Matured'}</div>
                        {
                            type == "active" ?
                                (function () {
                                    let maturein = data && new Date(data.createdAt).getTime() / 1000 + data.lifespan
                                    let formated = new Date(maturein * 1000);

                                    return (
                                        <>
                                            <div style={{ fontSize: '.7rem' }}>
                                                {month[new Date(formated).getMonth()]} {new Date(formated).getDate()}, {new Date(formated).getFullYear()}
                                            </div>
                                            <div style={{ fontSize: '.7rem' }}>
                                                {new Date(formated).getHours()}  : {new Date(formated).getMinutes()} : {new Date(formated).getSeconds()}
                                            </div>
                                        </>
                                    )
                                }()) :
                                <>
                                    <div style={{ fontSize: '.7rem' }}>
                                        {month[new Date(data.updatedAt).getMonth()]} {new Date(data.updatedAt).getDate()}, {new Date(data.updatedAt).getFullYear()}
                                    </div>
                                    <div style={{ fontSize: '.7rem' }}>
                                        {new Date(data.updatedAt).getHours()} : {new Date(data.updatedAt).getMinutes()} : {new Date(data.updatedAt).getSeconds()
                                        }</div>
                                </>
                        }
                    </div>
                    <div>
                        <div style={{ fontWeight: 600 }}>Returns <span style={{ color: 'var(--yellow)' }}>{data.returnPercentage}%</span></div>
                        <div style={{ fontSize: '.7rem' }}>{data.rewards?.toFixed(2)} {data.currency}</div>
                    </div>
                </div>
            </div>
        </CardStyle>
    )
}



const CardStyle = styled.div`
  width: 260px;
  height: 150px;
  border-radius: 5px;
  margin: 10px auto;
  padding: 10px;
  box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #aaa;

  .title{
    text-align: left;
    height: 25px;
    color: var(--blue);
    
  }

  .line{
    height: 3px;
    width: 100%;
    border: 1px solid var(--blue);
    display: flex;
    align-items: center;   
    
    .progres{
      width:  ${({ type }) => type === 'active' ? `50%` : `100%`};
      height: 2px;
      background: var(--blue);
    }
  }

  .body{
    height: calc(100% - 25px);
    display: flex;
    align-items: center;

    .left, .right{
      width: 50%;
      height: 100%;
      padding-top: 3px;
      font-size: .9rem

    }
  }

`
