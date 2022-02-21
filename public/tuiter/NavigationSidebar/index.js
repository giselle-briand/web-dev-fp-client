const NavigationSidebar = () => {
    return(`
            <div class="list-group">
                    <div class="list-group-item"><i class="fa-brands fa-twitter"></i></div>
                    <a href="../home.html" class="list-group-item list-group-item-action">
                        <i class="fa-solid fa-house-chimney wd-float-left pt-1 pe-1"></i>
                        <div class="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Home</div>
                    </a>
                    <a href="../ExploreScreen/explore.html" class="list-group-item list-group-item-action active">
                        <i class="fa-solid fa-hashtag wd-float-left pt-1 pe-1"></i>
                        <div class="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Explore</div>
                    </a>
                    <a href="../notifications.html" class="list-group-item list-group-item-action"><i
                            class="fa-solid fa-bell wd-float-left pt-1 pe-1"></i>
                        <div class="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Notifications</div>
                    </a>
                    <a href="../messages.html" class="list-group-item list-group-item-action"><i
                            class="fa-solid fa-envelope wd-float-left pt-1 pe-1"></i>
                        <div class="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Messages</div>
                    </a>
                    <a href="../bookmarks.html" class="list-group-item list-group-item-action"><i
                            class="fa-solid fa-bookmark wd-float-left pt-1 pe-1"></i>
                        <div class="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Bookmarks</div>
                    </a>
                    <a href="../lists.html" class="list-group-item list-group-item-action">
                        <i class="fa-solid fa-list wd-float-left pt-1 pe-1"></i>
                        <div class="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Lists</div>
                    </a>
                    <a href="../profile.html" class="list-group-item list-group-item-action"><i
                            class="fa-solid fa-user wd-float-left pt-1 pe-1"></i>
                        <div class="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">Profile</div>
                    </a>
                    <a href="../more.html" class="list-group-item list-group-item-action">
                        <span class="fa-stack wd-span-more-padding wd-float-left pt-1 pe-1">
                            <i class="fa-solid fa-circle fa-stack-1x"></i>
                            <i class="fa-solid fa-ellipsis fa-stack-1x fa-inverse"></i>
                        </span>
                        <div class="wd-float-left d-xxl-block d-xl-block d-lg-none d-md-none d-sm-none">More</div>
                    </a>
                    <a href="../tuit.html" class="btn btn-primary wd-override-bs-tuit" type="button">
                        Tuit
                    </a>
                </div>
    `);
}
export default NavigationSidebar;
