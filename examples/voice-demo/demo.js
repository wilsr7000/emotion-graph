// GSX Voice Demo - UI Display Only

// Demo state for display
const demoState = {
    session_id: "demo-2024-001",
    current_channel: "chat",
    previous_channels: [],
    active_games: {
        hangman: {
            secret_word: "PATTERN",
            revealed: "_A__ER_",
            guessed_letters: ["E", "S", "A", "T", "R"],
            incorrect_guesses: ["S"],
            remaining_guesses: 5,
            status: "active",
            rules: {
                vowel_cost: 1,
                consonant_cost: 1,
                total_allowed: 6
            }
        },
        tic_tac_toe: {
            board: [
                ["O", "_", "X"],
                ["_", "X", "_"],
                ["O", "_", "_"]
            ],
            current_turn: "player",
            status: "active"
        }
    }
};

// Demo messages
const demoMessages = [
    { type: "user", text: "Let's play hangman. You host - pick a word." },
    { type: "agent", text: "Ready. I've picked a 7-letter word. You have 6 guesses.", game: "hangman", display: "_ _ _ _ _ _ _" },
    { type: "user", text: "E" },
    { type: "agent", text: "Two E's found! 6 guesses remaining.", game: "hangman", display: "_ E _ _ E _ _" },
    { type: "user", text: "Let's also play tic-tac-toe. I'll be X." },
    { type: "agent", text: "Got it. Adding tic-tac-toe - you're X, I'm O. Your move on either game.", game: "tictactoe" },
    { type: "user", text: "Center square" },
    { type: "agent", text: "You took center. I'll take top-left.", game: "tictactoe-move" },
    { type: "user", text: "T in hangman" },
    { type: "agent", text: "One T! 5 guesses left.", game: "hangman", display: "_ A T T E _ _" },
];

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    renderMessages();
    renderState();
    renderTimeline();
    setupChannelSwitcher();
    setupCategoryToggles();
    updateKnowledge();
});

// Render conversation messages
function renderMessages() {
    const container = document.getElementById('conversationMessages');
    container.innerHTML = '';

    demoMessages.forEach((msg, index) => {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${msg.type}`;

        let content = `<div class="message-content">${msg.text}`;

        if (msg.game === 'hangman') {
            content += `<div class="game-display"><div class="hangman-word">${msg.display}</div></div>`;
        } else if (msg.game === 'tictactoe') {
            content += `<div class="game-display"><div class="tictactoe-board">  _ | _ | _
 ───┼───┼───
  _ | _ | _
 ───┼───┼───
  _ | _ | _</div></div>`;
        } else if (msg.game === 'tictactoe-move') {
            content += `<div class="game-display"><div class="tictactoe-board">  O | _ | _
 ───┼───┼───
  _ | X | _
 ───┼───┼───
  _ | _ | _</div></div>`;
        }

        content += '</div>';
        content += `<div class="message-meta">${msg.type === 'user' ? 'You' : 'Agent'} · just now</div>`;

        messageEl.innerHTML = content;
        container.appendChild(messageEl);
    });

    // Add typing indicator
    const typing = document.createElement('div');
    typing.className = 'message agent';
    typing.innerHTML = `<div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    </div>`;
    container.appendChild(typing);

    container.scrollTop = container.scrollHeight;
}

// Render state JSON with syntax highlighting
function renderState() {
    const stateEl = document.getElementById('stateDisplay');
    const json = JSON.stringify(demoState, null, 2);

    const highlighted = json
        .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
        .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
        .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
        .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
        .replace(/: (null)/g, ': <span class="json-null">$1</span>');

    stateEl.innerHTML = highlighted;
}

// Render activity timeline
function renderTimeline() {
    // Voice output bar
    const voiceOutput = document.getElementById('voiceOutputTrack');
    voiceOutput.innerHTML = `
        <div class="timeline-bar active" data-type="voice-output" style="left: 0%; width: 45%;">
            "Let me check the board..."
        </div>
        <div class="timeline-marker start" style="left: 0%;">0ms</div>
    `;

    // Reasoning bar
    const reasoning = document.getElementById('reasoningTrack');
    reasoning.innerHTML = `
        <div class="timeline-bar" data-type="reasoning" style="left: 10%; width: 60%;">
            minimax calculation
        </div>
        <div class="timeline-marker" style="left: 10%;">120ms</div>
        <div class="timeline-marker end" style="left: 70%;">1.6s</div>
    `;

    // Lookup bar
    const lookup = document.getElementById('lookupTrack');
    lookup.innerHTML = `
        <div class="timeline-bar" data-type="lookup" style="left: 5%; width: 15%;">
            state fetch
        </div>
        <div class="timeline-marker" style="left: 5%;">40ms</div>
        <div class="timeline-marker" style="left: 20%;">180ms</div>
    `;

    // Voice result bar
    const voiceResult = document.getElementById('voiceResultTrack');
    voiceResult.innerHTML = `
        <div class="timeline-bar" data-type="voice-result" style="left: 70%; width: 30%;">
            "Bottom-right wins..."
        </div>
        <div class="timeline-marker" style="left: 70%;">1.6s</div>
    `;

    document.getElementById('timelineElapsed').textContent = '1847ms';
}

// Setup channel switcher
function setupChannelSwitcher() {
    const buttons = document.querySelectorAll('.channel-btn');
    const indicator = document.getElementById('channelIndicator');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const channel = btn.dataset.channel;
            document.body.setAttribute('data-channel', channel);
            indicator.textContent = channel;

            demoState.current_channel = channel;
            renderState();
        });
    });
}

// Setup category toggles in schema library
function setupCategoryToggles() {
    const categories = document.querySelectorAll('.category-header');

    categories.forEach(header => {
        header.addEventListener('click', () => {
            const category = header.parentElement;
            category.classList.toggle('collapsed');
        });
    });
}

// Update knowledge display
function updateKnowledge() {
    document.getElementById('knowledgeFacts').textContent = '"Standard hangman allows 6 incorrect guesses"';
    document.getElementById('knowledgeProcedures').textContent = '"After each guess, reveal matching letters"';
    document.getElementById('knowledgeSchemas').textContent = '{ secret_word, revealed, guessed, remaining }';
    document.getElementById('knowledgePolicies').textContent = '"Never reveal answer until win/loss"';

    document.querySelectorAll('.knowledge-item').forEach(item => {
        item.classList.add('active');
    });
}

// Handle input (just for show)
document.getElementById('userInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const input = e.target;
        if (input.value.trim()) {
            // Just clear input for demo
            input.value = '';
        }
    }
});

document.getElementById('sendBtn')?.addEventListener('click', () => {
    const input = document.getElementById('userInput');
    if (input.value.trim()) {
        input.value = '';
    }
});
