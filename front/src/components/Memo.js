import React  from "react";
import { useState, useEffect } from "react";


const Memo = () => {

    const [memos, setMemos] = useState([]);
    const fetchMemoData = async() => {
        await fetch(`https://looklock-backend.herokuapp.com/api/memo`,  {
                method:"GET",
                headers:{
                    "Content-Type": "application/json;charset=UTF-8",
                    'Accept': 'application/json',
                },
                mode:"cors",
        }). then(
            async result => {
                let res = await result.json();
                console.log("메모들 : ", res)
                setMemos(res);
            })
            .catch(error =>
                console.log("NetworkError : ", error));

    };
    useEffect(() => {
        fetchMemoData();
        console.log(memos.values,  typeof(memos));
    }, [])
    
    return (
        <>
        <h1> 메모장 </h1><br/><br/>
        <table>
        	<tbody>
         		<tr className='trList'>
                {
                memos?.map( memo =>
                	<td className='cell' key={memo._id}>
                    	<div className='inner'>
                        	<h2> {memo.title} </h2>
                            <h5> {memo.author} </h5><br/><br/>
                            <h4> {memo.content} </h4><br/>
                        </div>
					</td>
                )}
				</tr>
			</tbody>
      	 </table>
    
        </>
    );
}

export default Memo;