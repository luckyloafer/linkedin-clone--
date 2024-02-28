import { firestore } from '../firebaseConfig'
import { addDoc, collection, onSnapshot, doc, updateDoc, query, where, setDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

let postsRef = collection(firestore, 'posts')
let userRef = collection(firestore, 'users')
let likeRef = collection(firestore, 'likes')
let commentsRef = collection(firestore, 'comments')
let connectionRef = collection(firestore, 'connections')

export const postStatus = (object) => {

    // let object = {
    //     status:status
    // }
    addDoc(postsRef, object)
        .then((res) => {
            toast.success("Posted successfully");
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getStatus = (setAllStatus) => {
    onSnapshot(postsRef, (response) => {
        setAllStatus(response.docs.map((docs) => {
            return { ...docs.data(), id: docs.id }
        }))
    })
}

export const getSingleStatus = (setAllStatus, id) => {

    const singlePostQuery = query(postsRef, where("userID", '==', id));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        )
    })
}

export const getAllUsers = (setAllUesrs) => {

    onSnapshot(userRef, (response) => {
        setAllUesrs(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        )
    })
}

export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where('email', '==', email));

    onSnapshot(singleUserQuery, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })[0]
        )
    })
}

export const postUserData = (object) => {
    addDoc(userRef, object)
        .then(() => {

        })
        .catch((err) => {
            console.log(err);
        })
}

export const getCurrentUser = (setCurrentUser) => {

    let currEmail = localStorage.getItem('userEmail')
    onSnapshot(userRef, (response) => {
        setCurrentUser(response.docs.map((docs) => {
            return { ...docs.data(), userID: docs.id }
        }).filter((item) => {
            return item.email === currEmail
        })[0]
        )
    })
}

export const editProfile = (userID, payLoad) => {
    let userToEdit = doc(userRef, userID)
    console.log("firestore api")

    updateDoc(userToEdit, payLoad)
        .then(() => {
            toast.success('Profile updated successfully')
        })
        .catch((err) => {
            console.log(err);
        })
}

export const likePost = (userId, postId, liked) => {

    console.log(userId)
    console.log(postId)

    try {
        let docToLike = doc(likeRef, `${userId}_${postId}`)

        if (liked) {
            deleteDoc(docToLike)
        }
        else {
            setDoc(docToLike, { userId, postId })
        }

    } catch (error) {
        console.log(error)
    }

}

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {

        let likeQuery = query(likeRef, where('postId', '==', postId))

        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data())
            let likesCount = likes.length

            const isLiked = likes.some((like) => like.userId === userId)
            setLikesCount(likesCount);
            setLiked(isLiked)
        })

    } catch (error) {
        console.log(error)
    }
}

export const postComment = (postId, comment, timeStamp, name) => {

    try {

        addDoc(commentsRef, { postId, comment, timeStamp, name })

    } catch (error) {
        console.log(error);
    }
}

export const getComments = (postId, setComments) => {
    try {

        let singlePostQuery = query(commentsRef, where('postId', '==', postId))
        onSnapshot(singlePostQuery, (response) => {
            const comments = response.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setComments(comments)
        })

    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, status, postImage) => {

    let docToUpdate = doc(postsRef, id)

    try {
        updateDoc(docToUpdate, { status ,postImage});
        toast.success('Post updated')
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => {
    let docToDelete = doc(postsRef, id);

    try {
        deleteDoc(docToDelete)
        toast.success('Post deleted')
    } catch (error) {
        console.log(error)
    }
}

export const addConnection = (userId, targetId) => {

    // console.log(userId)
    // console.log(postId)

    try {
        let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`)


        setDoc(connectionToAdd, { userId, targetId })
        toast.success('Connected successfully')

    } catch (error) {
        console.log(error)
    }

}

export const getConnections = (userId, targetId, setIsConnected) => {
    try {

        let connectionsQuery = query(connectionRef, where('targetId', '==', targetId))

        onSnapshot(connectionsQuery, (response) => {
            let connections = response.docs.map((doc) => doc.data())

            const isConnected = connections.some((connection) => connection.userId === userId)

            setIsConnected(isConnected)
        })

    } catch (error) {
        console.log(error)
    }
}