import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import "./comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Comment({ comment, user, musicid }) {
    // const dispatch = useDispatch();
    // const [editComForm, setEditComForm] = useState(false);

    return editComForm ? null : (
        <div className="comnentContainer">
            <div className="comnentBox">{comment.user.username}</div>
            <div className="comnents">{comment.comment}</div>
            {user?.id === comment.User.id && (
                <div className="commentBtn">
                    <FontAwesomeIcon icon={faEdit} className="editBtn" />
                    <FontAwesomeIcon icon={faTrashAlt} className="deleteBtn" />
                </div>
            )}
        </div>
    );
}
