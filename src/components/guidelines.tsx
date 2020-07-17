import React, {useEffect} from 'react';
import { siteName } from '../lib/const';
import "../styles/form.scss";

const Guidelines = () => {

    useEffect(() => {
        document.title = `${siteName} Guidelines`;
    });

    return (
        <div className="bg guidelines">
            <h1>Guidelines</h1>
            <p>
                CodeComplex is an online dev community that allows users of all skill levels to share their side projects with fellow hackers. 
                Users can create, like, save and comment on projects.
            </p>
            <p>
                Our goal is to inspire the dev community to create something awesome by seeing the works of others. 
                Any developer who has worked on a personal project has undoubtedly spent hours on end trying to find a solution 
                to a bug or figuring out a way to implement a new feature. But once a project has been completed, there is no greater 
                satisfaction than releasing your project to the rest of the world to see.
            </p>
            <p>
                We are trying to create a positive and welcoming experience for all our users and we expect everyone to follow 
                the rules and guidelines. Violation of any of these rules could lead to a removal of your project or a permanently 
                banned account.
            </p>

            <h1>Project Submissions </h1>

            <ol>
                <li>
                    Please keep your project submissions clean.
                </li>
                <li
                    >Please do not post any NSFW content including sexually explicit media, violence or anything else that may offend others. 
                    This includes your project’s name, description and the application itself.
                </li>
                <li>
                    Any kind of illegal related content is not allowed.
                </li>
            </ol>

            <h1>Comments</h1>

            <ol>
                <li>
                    Please be kind and respectful to your fellow hacker. Ask a question, congratulate, compliment or share your thoughts.
                </li>
                <li>
                    Please do not leave any comment that may be considered harassing, bullying or condescending.
                </li>
                <li>
                    Please do not try to stir up unnecessary drama (e.g “Dude, PHP sucks!”)
                </li>
            </ol>

            <h1>General</h1>

            <ol>
                <li>
                    Please do not try to break the website. If you discovered a bug, please let us know at codecomplex@gmail.com
                </li>
                <li>
                    Please do not spam the website.
                </li>
                <li>
                    Please do your part to make this community as friendly and supportive as much as possible.
                </li>
            </ol>

        </div>
    )
}

export default Guidelines;