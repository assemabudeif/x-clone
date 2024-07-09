$(document).ready(async function () {
    const url = "/JSON/tweets.json";
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users"))
    let userDetails = undefined;
    for (const data of users) {
        if (data.email === user.email) {
            userDetails = data;
            break;
        }
    }
    console.log(userDetails);
    $("#username").text(userDetails.username.replaceAll(" ", "").toLowerCase());
    $("#name").text(userDetails.username);

    let posts = $('#posts');

    // "https://jsonplaceholder.typicode.com/posts";
    let tweets = []
    await $.ajax(url)
        .done(function (data) {
            tweets = data;
            console.log(tweets);
        })
        .fail(function () {
            console.log("Error getting posts");
        });

    $.fn.addPost = function (post) {
        $(this).html(
            `
                 <article class="text-white border border-dark border-start-0 border-top-0  border-end-0">
                                <div class="p-3 ">
                                    <img src="./images/user.png" width="45px" height="45px" 
                                        class="rounded-3 me-1 mb-3" alt="">
                                    <span class="fs-6 fw-bold align-top me-1">${post.name}</span>
                                    <span class="fs-7 align-top we-1"
                                        style="color: rgb(113, 118, 123);">@${post.username}</span>
                                    <span class="fs-7 align-top" style="color: rgb(113, 118, 123);">. ${post.created_at.split("T")[0]}</span>

                                    <a href="" class="float-end">
                                        <img src="./images/more.png" width="30px" alt="">
                                    </a>
                                </div>

                                <p class="fs-6 mx-5 mb-3">
                                  ${post.content}
                                </p>` +
            (Math.floor(Math.random() * 100) % 2 === 0 ? `<img src="./images/mask.jpg" width="80%" class="d-block mx-auto rounded-4 border border-dark" alt="">` : ``) +
            `
                                <div class="d-flex justify-content-between p-3 tweet-btns mx-5">
                                    <a href="" class="d-flex p-2 rounded-5" id="btn-comment">
                                        <img src="./images/comment.png" width="20px" class="me-2" alt="">
                                        <span class="fs-6">${post.comments}</span>
                                    </a>
                                    <a href="" class="d-flex p-2 rounded-5" id="btn-retweet">
                                        <img src="./images/retweet.png" width="20px" class="me-2" alt="">
                                        <span class="fs-6">${post.retweets}</span>
                                    </a>
                                    <a href="" class="d-flex p-2 rounded-5" id="btn-like">
                                        <img src="./images/like.png" width="20px" class="me-2" alt="">
                                        <span class="fs-6">${post.likes}</span>
                                    </a>
                                    <a href="" class="d-flex p-2 rounded-5" id="btn-views">
                                        <img src="./images/views.png" width="20px" class="me-2" alt="">
                                        <span class="fs-6">${post.views}</span>
                                    </a>
                                    <div class="float-end d-flex p-2 rounded-5">
                                        <a href="" id="btn-save" class="me-3 rounded-5">
                                            <img src="./images/save.png" width="20px" alt="">
                                        </a>
                                        <a href="" id="btn-share" class="rounded-5 me-2">
                                            <img src="./images/share.png" width="20px" alt="">
                                        </a>
                                    </div>
                                </div>
                            </article>`
        );
    }

    for (let tweet of tweets) {
        let $post = $('<div>');
        $post.addPost(tweet);
        posts.append($post);
    }

    $("#post-tweet").click(function () {
        let content = $("#add-post-content").val();
        if (content !== "") {
            let $post = $('<div>');
            $post.addPost({
                "tweet_id": ++tweets.length,
                "username": userDetails.username.replaceAll(" ", "").toLowerCase(),
                "name": userDetails.username,
                "content": content,
                "created_at": 'now',
                "likes": 0,
                "retweets": 0,
                "comments": 0,
                "views": 0,
                "image_url": "./images/user.png",
            },);
            posts.prepend($post);
            $("#add-post-content").val("");
        }
    });

    $(".btn-logout").click(function () {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });
});