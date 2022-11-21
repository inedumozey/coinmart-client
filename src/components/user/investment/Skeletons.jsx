import styled from "styled-components";
import Skeleton from "../../Skeleton";

export default function Skeletons() {

  return (
    <CardStyle>
      <div className="title">
        <div className="header">
          <Skeleton />
        </div>
        <div className="line">
          <Skeleton />
        </div>
      </div>
      <div className="body">
        <div className="left">
          <Skeleton />
        </div>
        <div className="right">
          <Skeleton />
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
    height: 25px;

    .header {
        width: 40%;
        height: 70%;
        padding: 2px 0;
    }
    
    
  }

  .line{
    height: 20%;
    width: 100%;
  }

  .body{
    height: calc(100% - 25px);
    display: flex;
    align-items: center;

    .left, .right{
      width: 50%;
      padding: 10px;
      height: 100%;
      padding-top: 3px;

    }
  }

`
