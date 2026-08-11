import React from 'react'
import { useEffect } from 'react';

function PageNotFound() {

    useEffect(
        () => {
            document.title = "404 | StudyBuddy";
        },
        []
    )

    return (
        <div className='notFoundPage'>
            <h2>404</h2>
            <h1>Page Not Found</h1>
            <img src="..\src\assets\sitting-penguin2.png" alt="penguin" id="notFound-penguin" />

            <p>We couldn't find the page that you were looking for</p>
            <p>Check the URL to make sure it's correct and try again</p>

        </div>
    )
}

export default PageNotFound