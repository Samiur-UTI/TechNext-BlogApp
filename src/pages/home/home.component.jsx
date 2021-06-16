import React from 'react';
import './home.styles.scss'
import PostDashBoard from '../../components/postDashBoard/postDashBoard.component'

export default function Home() {
    return (
            <div className="home">
               <h1>All Posts</h1>
                <PostDashBoard/>
            </div>
        )
}

