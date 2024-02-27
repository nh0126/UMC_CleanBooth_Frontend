import React, {useRef} from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Recipe from './RecipeBox.js';
import Slider from 'react-slick';
import Info from './ProductInfo';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useEffect} from 'react';
import axios from 'axios';

const BodyTemplateBlock = styled.div`
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 30px;
    .category{
        font-size: 10pt;
        text-align: left;
    }
    .ctgr{
        text-decoration: none;
        color: black;
    }
    .detail{
        margin-top: 30px;
        font-weight: bold;
        font-size: 15pt;
    }
    .share{
        width: 50px;
        height: 50px;
        float: right;
        vertical-align: middle;
        margin-bottom: 6px;
        margin-right: 20px;
    }
    .sharebox{
        clear: both;
        float: right;
        height: 110px;
        width: 300px; 
        margin-right: 20px;
        border: 2px solid #009F50;
        border-radius: 7px;
    }
    .urltxt{
        width: 80%;
        height: 25%;
        margin-left: 7%;
        margin-top: 5%;
        border: 0;
        border-radius: 7px;
        display: block;
        background-color: #e6e6e6;
        color: #999999;
        padding-left: 10px;
    }
    .copyBttn{
        margin-left: 35%;
        margin-top: 3%;
        display: block;
        vertical-align: bottom;
        background-color: #009F50;
        color: #FFFFFF;
        &:active,
        &:hover{
            background-color: var(--button-hover-bg-color, #00954B);
        }
        font-size: 10pt;
        height: 37px;
        width: 30%;
        border: 0;
        border-radius: 5px;
    }
    .option{
        padding-bottom: 12px;
        text-decoration: none;
        color: black;
    }
    .detail > a:hover {
        border-bottom: 7px solid #009f50; /* 초록색 밑줄을 추가합니다. */
    }
    .logo180{
        margin-top: 70px;
        width: 183px;
    }
    .certified{ /* 클린부스 인증 뱃지 */
        font-size: 22pt;
        font-weight:bold;
    }
    .badge{ /* 뱃지 3개 */
        margin: 30px;
        width: 130px;
    }
    .badgeFig{
        display: inline-block;
    }
    .badgeName{
        font-weight: bold;
        font-size: 15pt;
    }
    .cap0{
        margin-top: 70px;
        margin-bottom: 30px;
        font-weight: bold;
        font-size: 22pt;
    }
    .cap1{
        font-weight: bold;
        font-size: 15pt;
        margin-bottom: 0;
    }
    .cap2{
        margin-top: 3px;
    }
    .captionBlock{
        margin-top:40px;
    }
    .dash{
        border: 1px dashed #009F50;
        flex: auto;
    }
    .dashedhr{
        margin-top: 100px;
        margin-bottom: 50px;
        display: flex;
        align-items: center;
    }
    .txt { /* 대쉬바 사이 글자 */
        padding: 0 10px;
        font-weight: bold;
        font-size: 15pt;
    }
    .nutrition{
        width: 90%;
        margin-top: 40px;
        text-align: center;
    }
    .moreRecipe{
        text-align: right;
        margin-top: 20px;
    }
    .moreR{
        display: inline-block;
        color: #666666;
        font-weight: bold;
    }
    .arrowRight{
        display: inline-block;
        width: 25px;
        margin-left: 5px;
        vertical-align: middle;
        padding-bottom: 6px;
    }
`;

const ContainerStyle = styled.div`
    .pic{
        width: 45%;
        text-align: left;
    }
    .item{
        width: 55%;
    }
    .container{
        display: flex;
        padding-top: 20px;
    }
    .item01{
        text-align: left;
        display: block;
        height:89%;
        margin-left: 30px;
    }
    .brandName{
        color: #999999;
        font-size: 15pt;
    }
    .productName{
        color: #333333;
        font-size: 25pt;
        font-weight: bold;
    }
    .item02{
        display: block;
        height: 11%;
    }
    .heart{ /* 찜하기 버튼 */
        height: 50px;
        display: inline-block;
    }
    .shopBttn{ /* 빠른 구매 버튼 */
        display: inline-block;
        margin-left: 5px;
        vertical-align: top;
        background-color: #009F50;
        color: #FFFFFF;
        &:active,
        &:hover{
            background-color: var(--button-hover-bg-color, #00954B);
        }
        font-size: 13pt;
        height: 50px;
        width: 80%;
        border: 0;
        border-radius: 10px;
    }
`;

const Container = styled.div`
	width: 100%;
    height: 200px;
    .slick-dots {
        .slick-active {
            button::before {
                color: #b3b3b3;
            }
        }
        button::before {
        color: #b3b3b3;
        }
    }
    .slick-arrows {
    }
`;

const NextArrow = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    z-index: 99;
    text-align: center;
    line-height: 50px;
`
const PrevArrow = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    left: 10px;
    z-index: 99;
    text-align: center;
    line-height: 50px;
`


function PDetailBlock() {
    
    //let [PDetail, setPDetail] = useState(['대분류', '소분류', 'Rectangle 179', '브랜드명', '제품명']);
    const [PDetail, setPDetail] = useState({
        item: {
            itemId: null,
            name: '',
            brandName: '',
            nutrient: {
                salt: '',
                carbohydrate: '',
                sweet: '',
                fat: '',
                transFat: '',
                saturatedFat: '',
                cholesterol: '',
                protein: ''
            },
            price: 0,
            image: '',
            avgRating: 0.0,
            orderLink: '',
            cleanPremium: false,
            allergyInfo: '',
            ingredientInfo: '',
            reviewCount: 0,
            isLiked: null
        },
        recipes: {
            recipeList: []
        },
        reviews: {
            reviewList: []
        }
    });

    const [Badge, setBadge] = useState([true, false, false]);

    useEffect(() => {
        axios.get('http://43.200.208.235:8080/items/28/latest/')
            .then(response => setPDetail(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
        <BodyTemplateBlock>
            <div>
                <div className='category'> {/* 왼쪽 상단 카테고리 정보 */}
                    <a className='ctgr' href=''>비건&다이어트</a>
                        <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
                    <a className='ctgr' href=''>대분류</a>
                        <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
                    <a className='ctgr' href='' style={{color:'#009F50'}}>소분류</a>
                </div>
                <ContainerStyle>
                    <div className='container'> {/* 맨 상단 제품 사진 옆 정보*/}
                            <img className='pic' src={PDetail.item.image} alt={PDetail.item.name}/>
                            <div className='item'>
                                <div className='item01'>
                                    <div className='brandName'>{PDetail.item.brandName}</div>
                                    <div className='productName'>{PDetail.item.name}<ShareBttn/></div>
                                </div>
                                <div className='item02'>
                                    <HeartBttn className='heart'/>
                                    <Button className='shopBttn' variant="success" onClick={() => window.open(PDetail.item.orderLink)}>빠른 구매하러 가기</Button>{' '}
                                </div>
                            </div>
                    </div>
                </ContainerStyle>
                <div className='detail'> {/* 상세정보, 구매 후기 이동 bar */}
                    <a href='#op1' className='option' style={{marginRight:'20%'}}>&nbsp;&nbsp;&nbsp;상세정보&nbsp;&nbsp;&nbsp;</a>
                    <a href='#op2' className='option' style={{marginLeft:'20%'}}>&nbsp;&nbsp;&nbsp;구매 후기&nbsp;&nbsp;&nbsp;</a>
                </div>
                <hr style={{fontColor:'#B3B3B3', marginTop: '15Qpx'}}/>
                <div> {/* 뱃지 3개 */}
                    <img className='logo180' src='/Rectangle180.png'/>
                    <p className='certified'>클린부스 인증 뱃지</p>
                    <figure className='badgeFig'>
                            <img className='badge' alt="React" src={'/CleanBadge.png'}/>
                            <figcaption className='badgeName'>클린 인증 뱃지</figcaption>
                    </figure>
                    <figure className='badgeFig'>
                            <div> {/* 우수 평점 뱃지 기본값: 흑백 */}
                                {{Badge} === true ? <img className='badge' alt="React" src={'/NiceBadge.png'}/> : <img className='badge' alt="React" src={'/Nice_no.png'}/>}
                            </div>
                            <figcaption className='badgeName'>우수 평점 뱃지</figcaption>
                    </figure>
                    <figure className='badgeFig'>
                            <div> {/* 클린 프리미엄 뱃지 기본값: 흑백 */}
                                {{Badge} === true ? <img className='badge' alt="React" src={'/PremiumBadge.png'}/> : <img className='badge' alt="React" src={'/Premium_no.png'}/>}
                            </div>
                            <figcaption className='badgeName'>클린 프리미엄 뱃지</figcaption>
                    </figure>
                </div>
                <div> {/* 뱃지 밑 설명 */}
                    <p className='cap0'>클린부스만 믿으세요!</p>
                    <div className='captionBlock'>
                        <p className='cap1'>자체 평가 기준 통과 제품</p>
                        <p className='cap2'>클린부스만의 평가 기준으로 안전한 제품만 판매하겠습니다.</p>
                    </div>
                    <div className='captionBlock'>
                        <p className='cap1'>소비자의 구매 후기 3.0 점 이상 제품</p>
                        <p className='cap2'>입고 후 후기가 90일 동안 3.0 이하는 판매를 철회하겠습니다.</p>
                    </div>
                    <div className='captionBlock'>
                        <p className='cap1'>클린체험단이 인정한 제품</p>
                        <p className='cap2'>체험단분들이 인정한 제품으로 평점 3.5 이상인 제품을 "프리미엄" 제품으로 판매하겠습니다.</p>
                    </div>
                </div>
                <div id='op1'> {/* 상세정보 이동 bar destination */}
                    <DashBar txt={'꼭 읽고 가세요!'}></DashBar>
                    <img className='nutrition' src='/Group38.png'/>
                </div>
                <DashBar txt={'클린 추천 레시피'}></DashBar>
                <div className='recipe'>
                    <RecipeSlider/>
                    <a href=''>
                        <div className='moreRecipe'>
                            <p className='moreR'>더 많은 비건 레시피를 보고 싶다면?</p>
                            <img className='arrowRight' src='/arrow.right.png'/>
                        </div>
                    </a>
                </div>
                <div id='op2'> {/* 구매 후기 이동 bar destination */}
                    <DashBar id='op2' txt={'구매 후기'}></DashBar>
                </div>
            </div>
            <Info/>
        </BodyTemplateBlock>
        </>
    );
}

function ShareBttn() { /* 공유버튼 */
    const [shareSrc, setShare] = useState("/share_off.png");
    const [isClicked, setClicked] = useState(false);
    const handleClick = () => {
        if (isClicked) {
            setShare("/share_off.png");
            setClicked(false);
        } else {
            setShare("/share_on.png");
            setClicked(true);
        }
    };
    
    return(
        <>
            <img className='share' src={shareSrc} onClick={handleClick}/>
            <div>{isClicked === true ? <ShareBox/> : null}</div>
        </>
    )
}

function HeartBttn() { /* 찜버튼 */
    const [heart, setHeart] = useState("/heart(3).png");
    const [isClicked, setClicked] = useState(false);
    const handleClick = () => {
        if (isClicked) {
            setHeart("/heart(3).png");
            setClicked(false);
        } else {
            setHeart("/heart(4).png");
            setClicked(true);
        }
    };
    
    return(
        <>
            <img className='heart' src={heart} onClick={handleClick}/>
        </>
    )
}

//수정필요: handleCopyClipBoard 현재 페이지 url 넘기기
function ShareBox() {
    const copyLinkRef = useRef();
    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("클립보드에 링크가 복사되었어요.");
        } catch (err) {
            console.log(err);
        }
    };
    return(
        <>
            <div className='sharebox'>
                <input className='urltxt' type="text" ref={copyLinkRef} value={"http://localhost:3000/"} />
                <Button onClick={handleCopyClipBoard} className='copyBttn' variant="success">복사하기</Button>{' '}
            </div>
        </>
    )
}


function DashBar(props) {
    return (
        <>
        <div className='dashedhr'>
                    <hr className='dash'/>
                    <span className='txt'>{props.txt}</span>
                    <hr className='dash'/>
        </div>
        </>
    )
}

function RecipeSlider() {
    const settings = {
        centerMode: false,
        dots: true,
        infinite: false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 1500,
                settings:{
                    slidesToShow: 2.2
                }
            }
        ]
    };
  
    return (
      <Container>
        <Slider {...settings}>
          <Recipe/>
          <Recipe/>
          <Recipe/>
          <Recipe/>
          <Recipe/>
        </Slider>
      </Container>
    );
  }

export default PDetailBlock;