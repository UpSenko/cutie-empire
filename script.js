document.addEventListener("DOMContentLoaded", function () {

    // Create the footer element
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '0';
    footer.style.width = '100%';
    footer.style.backgroundColor = '#f8f9fa';
    footer.style.padding = '1px 1px';
    footer.style.color = '#888888';
    footer.style.fontSize = '12px';
    footer.style.textAlign = 'center';
    footer.style.zIndex = '-999';

    // Create the copyright text element
    const copyrightText = document.createElement('p');
    copyrightText.textContent = '© 2024 This Website is not affiliated with Discord.';

    // Append the copyright text to the footer
    footer.appendChild(copyrightText);

    // Append the footer to the body
    document.body.appendChild(footer);


    // Fetch server information
    const inviteCode = 'upjaz95fKv'; //  server invite code
    const serverId = '1174127797602623539'; // server ID

    fetchServerInfo(inviteCode);

    function fetchServerInfo(inviteCode) {
        fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`)
            .then(response => response.json())
            .then(serverInfo => {
                const serverName = serverInfo.guild.name;
                const serverIconUrl = `https://cdn.discordapp.com/icons/${serverInfo.guild.id}/${serverInfo.guild.icon}.png`;
                const memberCount = serverInfo.approximate_member_count;

                // Set website title to server name
                document.title = serverName;

                // Set website icon to cropped server icon
                //var image_icon = serverIconUrl

                const link = document.createElement('link');
                link.type = 'image/svg+xml';
                link.rel = 'icon';
                link.href = 'Icons/home_icon.svg';
                // link.href = image_icon;
                document.head.appendChild(link);

                const tags = ['community', 'social', 'pokemon', 'informitave','cute',];
                displayServerTags(tags); // Pass the tags here
                displayServerInfo(serverName, serverIconUrl, memberCount);
                createServerDescription(serverIconUrl, inviteCode, serverName, memberCount); // Pass inviteCode to createServerDescription
                createMemberStats(memberCount);


            })
            .catch(error => console.error('Error fetching server information:', error));
    }
    function displayServerTags(tags) {
        const mainContent = document.querySelector('.main-content');

        // Create the server tags container
        const ServerTagsContainer = document.createElement('div');
        ServerTagsContainer.classList.add('server-tags-container');

        // Add styles to the server tags container
        ServerTagsContainer.style.marginTop = '20px'; // Add top margin to separate from other content

        // Create the tags label
        const tagsLabel = document.createElement('p');
        tagsLabel.textContent = 'Tags:';
        tagsLabel.classList.add('tags-label');
        tagsLabel.style.fontWeight = 'bold'; // Make the label bold

        // Append the tags label to the server tags container
        ServerTagsContainer.appendChild(tagsLabel);

        // Create a container for the tags
        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');

        // Add styles to the tags container
        tagsContainer.style.display = 'flex';
        tagsContainer.style.flexWrap = 'wrap'; // Allow tags to wrap to the next line if needed
        tagsContainer.style.gap = '10px'; // Add spacing between tags

        // Create and style each tag
        tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.textContent = tag;
            tagElement.classList.add('tag');
            // Add additional styles to the tag
            tagElement.style.padding = '8px 12px';
            tagElement.style.backgroundColor = '#f0f0f0';
            tagElement.style.borderRadius = '20px';
            tagElement.style.color = '#555';
            tagElement.style.fontWeight = 'bold';
            tagElement.style.cursor = 'pointer';

            // Add hover effect
            tagElement.addEventListener('mouseenter', function () {
                tagElement.style.backgroundColor = '#ddd'; // Change background color on hover
                tagElement.style.color = '#333'; // Change text color on hover
            });

            tagElement.addEventListener('mouseleave', function () {
                tagElement.style.backgroundColor = '#f0f0f0'; // Restore background color on mouse leave
                tagElement.style.color = '#555'; // Restore text color on mouse leave
            });

            // Append the tag to the tags container
            tagsContainer.appendChild(tagElement);
        });

        // Append the tags container to the server tags container
        ServerTagsContainer.appendChild(tagsContainer);

        // Append the server tags container to the main content
        mainContent.appendChild(ServerTagsContainer);
    }




    function createMemberStats(memberCount) {
        var lightenColor = '#000000';

        const mainContent = document.querySelector('.main-content');
        const memberStatsContainer = document.createElement('div');
        memberStatsContainer.classList.add('member-stats-container');
        memberStatsContainer.style.backgroundColor = '#ffffff';
        memberStatsContainer.style.padding = '20px';
        memberStatsContainer.style.borderRadius = '15px';
        memberStatsContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        memberStatsContainer.style.marginTop = '20px';
        memberStatsContainer.style.display = 'flex';
        memberStatsContainer.style.flexDirection = 'column';

        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('progress-bar-container');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.style.height = '20px';
        progressBar.style.width = '0%';
        progressBar.style.backgroundColor = 'rgba(128,128,128,0.8)';
        progressBar.style.borderRadius = '10px';
        progressBar.style.position = 'relative';

        const progressBarText = document.createElement('div');
        progressBarText.textContent = `Progress: 0%`;
        progressBarText.style.color = '#ffffff';
        progressBarText.style.fontWeight = 'bold';
        progressBarText.style.position = 'absolute';
        progressBarText.style.top = '-25px';
        progressBarText.style.left = '50%';
        progressBarText.style.transform = 'translateX(-50%)';

        const currentMembersLabel = document.createElement('div');
        currentMembersLabel.textContent = `Current Members: ${memberCount}`;
        currentMembersLabel.style.color = lightenColor;
        currentMembersLabel.style.fontWeight = 'bold';
        currentMembersLabel.style.marginTop = '10px';

        const goalLabel = document.createElement('div');
        const goalValue = 100; // Set goal to 100
        goalLabel.textContent = `Goal: ${goalValue}`;
        goalLabel.style.color = lightenColor;
        goalLabel.style.fontWeight = 'bold';
        goalLabel.style.marginTop = '10px';
        goalLabel.style.textAlign = 'right'; // Center the text horizontally

        progressBar.appendChild(progressBarText);
        progressBarContainer.appendChild(progressBar);

        memberStatsContainer.appendChild(currentMembersLabel);
        memberStatsContainer.appendChild(progressBarContainer);
        memberStatsContainer.appendChild(goalLabel);
        mainContent.appendChild(memberStatsContainer);

        animateProgressBar(memberCount);
    }

    function animateProgressBar(memberCount) {
        const progressBar = document.querySelector('.progress-bar');
        const goal = 100; // Set your goal here

        let progress = 0;

        const animationInterval = setInterval(frame, 10);

        function frame() {
            if (progress >= memberCount) {
                clearInterval(animationInterval);
            } else {
                progress++;
                const percentageValue = Math.round((progress / goal) * 100); // Calculate percentage based on the goal
                progressBar.style.width = `${percentageValue}%`;
                progressBar.innerText = `${percentageValue}%`;
                progressBar.style.fontSize = '18px';
                progressBar.style.color = '#ffffff';
                progressBar.style.fontWeight = 'bold';
                progressBar.style.textAlign = 'center'; // Center the text horizontally
                progressBar.querySelector('.progress-bar-text').textContent = `Progress: ${percentageValue}%`;
            }
        }
    }

    function displayServerInfo(serverName, serverIconUrl, memberCount) {
        const homeHeaderContainer = document.querySelector('.home-header-container');

        // Create server name overlay
        const serverNameOverlay = document.createElement('div');
        serverNameOverlay.textContent = ` `;  /// ${serverName}
        serverNameOverlay.classList.add('home-server-name-overlay');

        // Append server name overlay to home header container
        homeHeaderContainer.appendChild(serverNameOverlay);
    }

    function createServerDescription(serverIconUrl, inviteCode, serverName, memberCount) {
        const mainContent = document.querySelector('.main-content');
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('description-container');
        descriptionContainer.style.padding = '50px'; // Add padding around the content
        descriptionContainer.style.borderRadius = '0px'; // Add rounded corners
        descriptionContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)'; // Add box shadow
        descriptionContainer.style.marginTop = '20px'; // Add margin top to separate from the header
        descriptionContainer.style.display = 'flex'; // Use flexbox for layout
        descriptionContainer.style.alignItems = 'center'; // Align items vertically
        descriptionContainer.style.marginBottom = '20px'; // Add margin to separate from the next content
        descriptionContainer.style.justifyContent = 'center'; // Center content horizontally

        const serverInfoContainer = document.createElement('div');
        serverInfoContainer.style.display = 'flex'; // Use flexbox for layout
        serverInfoContainer.style.alignItems = 'center'; // Align items vertically

        const serverIconContainer = document.createElement('div');
        serverIconContainer.style.position = 'relative'; // Make the container position relative

        const serverIcon = document.createElement('img');
        serverIcon.src = serverIconUrl;
        serverIcon.alt = 'Server Icon';
        serverIcon.classList.add('server-icon'); // Add class for styling
        serverIcon.style.borderRadius = '50%'; // Make the icon round
        serverIcon.style.marginRight = '20px'; // Add margin to the right

        // Get the natural width of the image to calculate the radius
        serverIcon.onload = function () {
            const radius = serverIcon.width / 2; // Calculate the radius of the image
            const buttonMargin = radius - 16; // Adjust the margin as needed

            const joinButton = document.createElement('a'); // Change to anchor element
            joinButton.classList.add('join-button');
            joinButton.textContent = "Join";
            joinButton.href = `https://discord.gg/${inviteCode}`; // Set href to Discord invite link
            joinButton.style.padding = '6px 12px'; // Increase padding for better appearance
            joinButton.style.backgroundColor = '#5865F2'; // Use Discord's primary color for consistency
            joinButton.style.color = '#FFFFFF'; // Text color
            joinButton.style.borderRadius = '5px'; // Add some rounding to the button
            joinButton.style.border = '2px solid transparent'; // Add transparent border
            joinButton.style.cursor = 'pointer'; // Pointer cursor
            joinButton.style.textDecoration = 'none'; // Remove underline
            joinButton.style.position = 'absolute'; // Position the button
            joinButton.style.bottom = `-${buttonMargin}px`; // Align the button to the bottom of the container
            joinButton.style.left = 'calc(50% - 12px)'; // Align the button to the center horizontally based on the button width
            joinButton.style.transform = 'translateX(-50%)'; // Center the button horizontally
            joinButton.style.transition = 'background-color 0.4s, border-color 0.4s'; // Add transition

            joinButton.addEventListener('mouseenter', function () {
                joinButton.style.backgroundColor = '#7289DA'; // Change background color on hover
                joinButton.style.borderColor = '#7289DA'; // Change border color on hover
            });

            joinButton.addEventListener('mouseleave', function () {
                joinButton.style.backgroundColor = '#5865F2'; // Restore background color on mouse leave
                joinButton.style.borderColor = 'transparent'; // Restore border color on mouse leave
            });

            serverIconContainer.appendChild(serverIcon); // Add server icon to the container
            serverIconContainer.appendChild(joinButton); // Add join button to the container
        };

        serverInfoContainer.appendChild(serverIconContainer); // Add server icon container to the server info container

        const serverDescription = document.createElement('div');
        serverDescription.classList.add('server-description');
        serverDescription.style.flex = '1'; // Allow the description to expand to fill the available space
        serverDescription.innerHTML = `
            <style>
            .feature-list, .activity-list {
                list-style: none;
                padding-left: 0;
            }
    
            .feature-item, .activity-item {
                transition: color 0.4s ease;
                cursor: pointer;
                margin-bottom: 8px;
            }
    
            .feature-item:hover, .activity-item:hover {
                color: #ff7f50; /* Lighter color on hover */
            }
    
            .feature-item:hover:hover, .activity-item:hover:hover {
                color: #ff6347; /* Deeper color after 4s */
            }
            </style>
    
            <h2>Cutie Empire</h2>
            <hr style="border-color: #ccc;">
    
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div style="flex: -1;">
                    <h3>Features</h3>
                    <ul class="feature-list">
                        <li class="feature-item">Cozy & Comfy</li>
                        <li class="feature-item">Safe Space & Secure</li>
                        <li class="feature-item">Community Server Bot</li>
                    </ul>
                </div>
    
                <div style="flex: -1; margin-left: 25px;">
                    <h3>Activities</h3>
                    <ul class="activity-list">
                        <li class="activity-item">Talk to Level Up</li>
                        <li class="feature-item">Give us feedback</li>
                        <li class="activity-item">Pokemon Information</li>
                    </ul>
                </div>
            </div>
        `;

        serverInfoContainer.appendChild(serverDescription); // Add server description to the container

        descriptionContainer.appendChild(serverInfoContainer); // Add server info container to description container

        mainContent.appendChild(descriptionContainer);
    }







});
