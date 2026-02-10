import React from "react";
import { getPagesArray} from '../../../utils/pages';

function Pagination ({totalPages, changePage, page}) {
        let pagesArray = getPagesArray(totalPages);
    return (

        <div className="page_wrapper">
					{pagesArray.map(p=> 
					<span onClick={()=> changePage(p)} key={p} className={page === p ? 'page page__current' : 'page'}>{p}</span>
				)}
				</div>
    );
}

export default Pagination;