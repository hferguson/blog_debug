import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CommentList = ({postId}) => {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        console.log(`Retrieve comments for ${postId}`);
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    })
    return (
        <div>
            xxx
            <ul>
                {renderedComments}
            </ul>
        </div>
       
    )
};

export default CommentList;