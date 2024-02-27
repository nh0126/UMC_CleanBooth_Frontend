import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const RecipeTemplate = styled.div`
    display: inline-block;
    .recipeBox{
        display: flex;
        width: 352px;
        height: 199px;
        border-radius: 10px;
        border: 1px solid #CCCCCC;
        text-align: left;
    }
    .img{
        padding: 22px;
        width: 152px;
        height: 155px;
    }
    .item{
        height: 155px;
        margin-top: 22px;
    }
    .ctgr{
        color: #B3B3B3;
        margin: 0;
    }
    .name{
        font-weight: bold;
        font-size: 15pt;
        color: #333333;
        margin-top: 3px;
    }
    .intro{
        color: #333333;
        margin-top: 30px;
    }
`


function Recipe(){
    let [recipe, setRecipe] = useState(['Rectangle 190', '양식', '레시피 이름', '레시피 한 줄 소개']);
    return(
        <>
        <RecipeTemplate>
            <div className='recipeBox'>
                <img className='img' src={'/' + recipe[0] +'.png'}/>
                <div className='item'>
                    <p className='ctgr'>{recipe[1]}</p>
                    <p className='name'>{recipe[2]}</p>
                    <p className='intro'>{recipe[3]}</p>
                </div>
            </div>
        </RecipeTemplate>
        </>
    );
}

export default Recipe;