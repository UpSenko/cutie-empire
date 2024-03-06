document.addEventListener("DOMContentLoaded", function () {
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

                displayServerInfo(serverName, serverIconUrl, memberCount);
                createServerDescription(serverIconUrl, inviteCode, serverName, memberCount); // Pass inviteCode to createServerDescription
                createMemberStats(memberCount);

            })
            .catch(error => console.error('Error fetching server information:', error));
    }
    // Function to crop server icon and return the cropped URL
    function getCroppedServerIconUrl(serverIconUrl) {
        // Assuming the server icon is square, you can crop it to a smaller size
        // You can adjust the width and height according to your preference
        const croppedIconUrl = `${serverIconUrl}?size=64`;
        return croppedIconUrl;
    }

    progressBar.style.textAlign = 'center'; // Center the text horizontally


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
        goalLabel.textContent = `Goal: ${100 + memberCount}`;
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

        const totalMembers = 100 + memberCount;
        let progress = 0;

        const animationInterval = setInterval(frame, 10);

        function frame() {
            if (progress >= memberCount) {
                clearInterval(animationInterval);
            } else {
                progress++;
                const percentageValue = Math.round((progress / totalMembers) * 100);
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
        serverNameOverlay.textContent = `${serverName}`;
        serverNameOverlay.classList.add('home-server-name-overlay');

        // Append server name overlay to home header container
        homeHeaderContainer.appendChild(serverNameOverlay);
    }

    function createServerDescription(serverIconUrl, inviteCode, serverName, memberCount) {
        const mainContent = document.querySelector('.main-content');
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('description-container');
        descriptionContainer.style.padding = '50px'; // Add padding around the content
        descriptionContainer.style.borderRadius = '10px'; // Add rounded corners
        descriptionContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)'; // Add box shadow
        descriptionContainer.style.marginTop = '20px'; // Add margin top to separate from the header
        descriptionContainer.style.display = 'flex'; // Use flexbox for layout
        descriptionContainer.style.alignItems = 'center'; // Align items vertically
        descriptionContainer.style.flexDirection = 'column'; // Arrange items vertically
        

        const serverIcon = document.createElement('img');
        serverIcon.src = serverIconUrl;
        serverIcon.alt = 'Server Icon';
        serverIcon.classList.add('server-icon'); // Add class for styling
        serverIcon.style.marginBottom = '20px'; // Add margin bottom to the server icon
        //serverIcon.style.alignSelf = 'flex-start';
        serverIcon.style.alignSelf = 'center';
        serverIcon.style.borderRadius = '50%'; // Make the icon round


        serverIcon.style.display.flexDirection = 'left';
        const serverDescription = document.createElement('div');
        serverDescription.classList.add('server-description');
        serverDescription.style.marginBottom = '20px'; // Adjust the margin as needed

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
                    <li class="feature-item">Explore the Item Shop</li>
                </ul>
            </div>
    
            <div style="flex: -1; margin-left: 25px;">
                <h3>Activities</h3>
                <ul class="activity-list">
                    <li class="activity-item">Talk to Level Up</li>
                    <li class="activity-item">Communication & Gaming</li>
                    <li class="feature-item">Play Server Games => Earn Server Points => Buy From Item Shop</li>

                </ul>
            </div>
        </div>
    
        `;

        const joinButton = document.createElement('a'); // Change to anchor element
        joinButton.classList.add('join-button');
        joinButton.textContent = "Join";
        joinButton.href = `https://discord.gg/${inviteCode}`; // Set href to Discord invite link
        joinButton.style.padding = '8px 16px'; // Add padding to the button
        joinButton.style.backgroundColor = '#7289DA'; // Set button background color
        joinButton.style.color = '#FFF'; // Set button text color
        joinButton.style.border = 'none'; // Remove button border
        joinButton.style.cursor = 'pointer'; // Change cursor to pointer on hover
        joinButton.target = '_blank'; // Open link in a new tab
        joinButton.style.textDecoration = 'none'; // Remove underline from the button
        joinButton.style.marginTop = '0';
        joinButton.style.marginBottom = '20px'; // Adjust the margin as needed



        descriptionContainer.appendChild(serverIcon); // Add server icon to the container
        descriptionContainer.appendChild(joinButton);

        descriptionContainer.appendChild(serverDescription);

        mainContent.appendChild(descriptionContainer);
    }

});
