from fpdf import FPDF
from datetime import datetime
from fpdf.enums import XPos, YPos

class PDF(FPDF):
    def header(self):
        # Header with blue background
        self.set_fill_color(32, 80, 150)
        self.rect(0, 0, 210, 20, style='F')
        
        # Main title
        self.set_font("helvetica", "B", 16)
        self.set_text_color(255, 255, 255)
        self.cell(0, 10, "Linux Commands Cheat Sheet (Manglish Style)", 
                 new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")
        
        # Subtitle
        self.set_font("helvetica", "I", 10)
        self.cell(0, 5, "For Noobs, Pros, and Everyone In Between", 
                 new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")
        self.ln(10)
        
        # Orange separator line
        self.set_draw_color(255, 165, 0)
        self.set_line_width(0.5)
        self.line(10, 30, 200, 30)
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("helvetica", "I", 8)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, f"Page {self.page_no()} | Generated on {datetime.now().strftime('%Y-%m-%d')}", 
                 new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')

    def chapter_title(self, num, cmd):
        self.set_font("helvetica", "B", 12)
        self.set_text_color(32, 80, 150)
        self.set_fill_color(240, 248, 255)
        self.cell(0, 8, f"{num}. {cmd}", 
                 new_x=XPos.LMARGIN, new_y=YPos.NEXT, fill=True)
        self.ln(2)

    def chapter_body(self, expl):
        # First replace unsupported characters
        char_replacements = {
            "🐧": "(Penguin)",
            "🔥": "(Fire)",
            "🧠": "(Brain)",
            "😴": "(Sleep)",
            "📝": "(Pencil)",
            "💣": "(Bomb)",
            "✨": "(Sparkle)",
            "🌈": "(Rainbow)",
            "🧃": "(Juice)",
            "💾": "(Floppy)",
            "📦": "(Box)",
            "😅": "(Smile)",
            "🖥️": "(Computer)",
            "📁": "(Folder)",
            "🚪": "(Door)",
            "😌": "(Relieved)",
            "➡️": "(Right)",
            "🆕": "(New)",
            "😬": "(Grimace)",
            "🏗️": "(Construction)",
            "❌": "(X)",
            "✍️": "(Writing)",
            "🧾": "(Receipt)",
            "📜": "(Scroll)",
            "🔍": "(Magnify)",
            "🐍": "(Snake)",
            "🚀": "(Rocket)",
            "🔐": "(Lock)",
            "👑": "(Crown)",
            "🧍‍♂️": "(Man)",
            "🔑": "(Key)",
            "💪": "(Muscle)",
            "🧱": "(Brick)",
            "🙏": "(Pray)",
            "😤": "(Steam)",
            "📋": "(Clipboard)",
            "🪄": "(Wand)",
            "🌫️": "(Fog)",
            "🌐": "(Globe)",
            "📶": "(Signal)",
            "🌍": "(Earth)",
            "🪝": "(Hook)",
            "🔄": "(Refresh)",
            "⚡": "(Zap)",
            "🔁": "(Repeat)",
            "📴": "(Power)",
            "🧩": "(Puzzle)",
            "📜": "(Scroll)",
            "🧬": "(DNA)",
            "⏳": "(Hourglass)",
            "🔁": "(Repeat)",
            "🧼": "(Soap)",
            "✂️": "(Scissors)",
            "🔎": "(Loupe)",
            "🗃️": "(Filebox)",
            "💽": "(Minidisc)",
            "🔗": "(Link)",
            "🔌": "(Plug)",
            "⏰": "(Alarm)",
            "🕰️": "(Clock)",
            "🎛️": "(Knobs)",
            "🕑": "(Two)",
            "📆": "(Calendar)",
            "📅": "(Date)",
            "➗": "(Divide)",
            "📈": "(Chart)",
            "🎧": "(Headphones)",
            "🧭": "(Compass)",
            "📊": "(BarChart)",
            "🕒": "(Three)",
            "👥": "(People)",
            "⌛": "(Sand)",
            "👤": "(Person)",
            "🧑‍🤝‍🧑": "(Hands)",
            "🧰": "(Toolbox)",
            "🫠": "(Melt)",
            "⌚": "(Watch)",
            "💡": "(Bulb)",
            "💬": "(Speech)",
            "🛜": "(Wifi)",
        }
        
        for char, replacement in char_replacements.items():
            expl = expl.replace(char, replacement)
            
        self.set_font("helvetica", "", 10)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 6, expl)
        self.ln(3)
        
        # Add decorative separator
        self.set_draw_color(220, 220, 220)
        self.set_line_width(0.2)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(5)
# List of 100 commands with Manglish explanations
commands = [
    ("uname -a", "System info okke kaanikyum. Machine entha OS ennu ariyam. 🧠"),
    ("uptime", "Ethrayayi running aanennu parayum. Serveru urakkam illya 😴"),
    ("top", "Live CPU/RAM usage kaanikkum. Task manager pole 🔥"),
    ("htop", "`top`-inte premium version. Colorfull charts! 🌈"),
    ("free -h", "Memory status human readable aayi kaanikkum 🧃"),
    ("df -h", "Disk space check cheyyan (folder enthra space edukunnu) 💾"),
    ("du -sh *", "Current directoryile folders enthra space edukkunnu enn check cheyyan 📦"),
    ("whoami", "Ningal aaanennu terminal chothikkum 😅"),
    ("hostname", "Device name kaanikkum 🖥️"),
    ("ls -lah", "All files + permissions okke list cheyyum 📁"),
    ("cd folder/", "Folderilekku kadakkan 🚪"),
    ("cd ..", "Oru step mumbilekku back poykkal 😌"),
    ("cp file1 file2", "File copy cheyyan 📝"),
    ("mv old new", "File move or rename cheyyan 📦➡️🆕"),
    ("rm file.txt", "Delete cheyyum (careful bhai 😬)"),
    ("rm -rf folder/", "Folderum, ellamum remove cheyyum 💣"),
    ("touch file.txt", "Empty file create cheyyum ✨"),
    ("mkdir newfolder", "New folder undakkan 🏗️"),
    ("rmdir folder", "Folder remove cheyyum (empty aayirikkatte) ❌"),
    ("nano file.txt", "Terminalil file edit cheyyan ✍️"),
    ("cat file.txt", "File content kaanikkum 🧾"),
    ("less file.txt", "Big files nokkumbol easy aayi scroll cheyyan 📜"),
    ("grep 'word' file.txt", "Text search cheyyan fileil 🔍"),
    ("find . -name '*.py'", "Python files locate cheyyum 🐍"),
    ("chmod +x script.sh", "Script executable aakkum 🚀"),
    ("chmod 755 file", "File permission set cheyyum 🔐"),
    ("chown user:group file", "Owner/Group maattum 👑"),
    ("adduser abid", "Puthiya user create cheyyum 🧍‍♂️"),
    ("passwd abid", "Password set cheyyum 🔑"),
    ("usermod -aG sudo abid", "Admin power kodukkum 💪"),
    ("ps aux", "Running processes list cheyyum 🧱"),
    ("kill PID", "Process close cheyyum 🙏"),
    ("kill -9 PID", "Force kill cheyyum 😤"),
    ("jobs", "Current jobs kaanikkum 📋"),
    ("fg", "Job front il varum 🪄"),
    ("bg", "Job backgroundil poykkal 🌫️"),
    ("ip a", "Network interfaces + IP kaanikkum 🌐"),
    ("ping google.com", "Internet undo enn test cheyyum 📶"),
    ("curl ifconfig.me", "Public IP address kaanikkum 🌍"),
    ("wget URL", "Webil ninn download cheyyan 🪝"),
    ("scp user@ip:/path .", "Serveril ninn file copy cheyyan 🔄"),
    ("rsync -avz src/ dest/", "Sync cheyyan folders ⚡"),
    ("sudo reboot", "System restart cheyyum 🔁"),
    ("sudo shutdown now", "System off aakkum 📴"),
    ("sudo systemctl status nginx", "Service status kaanikkum 🧩"),
    ("sudo systemctl restart nginx", "Service restart cheyyum 🔄"),
    ("journalctl -xe", "Log file view cheyyum 📜"),
    ("dmesg", "Kernel level log kaanikkum 🧬"),
    ("history", "Command history kaanikkum ⏳"),
    ("!!", "Last command repeat cheyyum 🔁"),
    ("clear", "Terminal clean cheyyum 🧼"),
    ("alias ll='ls -lah'", "Shortcuts create cheyyan ✂️"),
    ("tail -f /var/log/syslog", "Live log follow cheyyum 🔎"),
    ("df -Th", "Filesystem typesum spaceum kaanikkum 🗃️"),
    ("lsblk", "Disks and partitions list cheyyum 💽"),
    ("mount", "Mounted devices list cheyyum 🔗"),
    ("umount /mnt", "Unmount cheyyum 🔌"),
    ("uptime -p", "Pretty formatil uptime ⏰"),
    ("uptime -s", "System boot aayath ethra neramayi enn kaanikkum 🕰️"),
    ("hostnamectl", "System hostname settings 🎛️"),
    ("timedatectl", "Time settings check/update 🕑"),
    ("date", "Current date/time kaanikkum 📆"),
    ("cal", "Calendar terminalil kaanikkum 📅"),
    ("bc", "Basic calculator open cheyyum ➗"),
    ("top -o %MEM", "Sort top by RAM usage 🧠"),
    ("iostat", "CPU/IO stats kaanikkum 📈"),
    ("netstat -tuln", "Listening ports kaanikkum 🎧"),
    ("ss -tuln", "Modern netstat replacement 🔍"),
    ("ping -c 4 8.8.8.8", "Google DNS ping cheyyum 🌐"),
    ("traceroute google.com", "Path trace cheyyum 🌍➡️📶"),
    ("dig google.com", "DNS lookup cheyyum 🧭"),
    ("nslookup google.com", "DNS query alternative 🧠"),
    ("top -u abid", "Abid userinte processes kaanikkum 🧍‍♂️"),
    ("free -m", "RAM usage MB il 📊"),
    ("uptime | awk '{print $3,$4}'", "Uptime only kaanikkum 🕒"),
    ("who", "Logged in users kaanikkum 👥"),
    ("w", "Who + ethra neramayi ennu kaanikkum ⌛"),
    ("users", "Active users list cheyyum 👤"),
    ("groups", "Group info kaanikkum 🧑‍🤝‍🧑"),
    ("groupadd devs", "New group create cheyyum 👥"),
    ("groupdel devs", "Group delete cheyyum ❌"),
    ("passwd -l user", "User lock cheyyum 🔒"),
    ("passwd -u user", "Unlock cheyyum 🔓"),
    ("which python", "Python location kaanikkum 🐍"),
    ("whereis nginx", "Binary + config files locate cheyyum 🧭"),
    ("locate file", "Fast file search (need db update) 🔍"),
    ("updatedb", "locate database update cheyyum 🧱"),
    ("zip file.zip file", "Zip file create cheyyum 🗜️"),
    ("unzip file.zip", "Zip extract cheyyum 📂"),
    ("tar -cvf file.tar folder", "Folder tar cheyyum 📦"),
    ("tar -xvf file.tar", "Tar extract cheyyum 🔓"),
    ("crontab -e", "Scheduled tasks set cheyyan 🕰️"),
    ("crontab -l", "List scheduled jobs 📆"),
    ("echo 'Hello World'", "Terminalil message print cheyyum 💬"),
    ("sleep 5", "5 seconds wait cheyyum 😴"),
    ("read var", "User input edukkum 🤔"),
    ("ifconfig", "Old IP command (still useful sometimes) 🛜"),
    ("top -n 1", "One-time top output 📊"),
    ("uptime && w", "Uptime + who ennu combine cheyyum 💡"),
    ("xargs", "Arguments pass cheyyan powerful tool 🧰"),
    ("yes", "Infinite repeat of 'yes' 🫠"),
    ("watch -n 1 date", "Live watch date ⌚"),
]

pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=15)

# Title Page
pdf.add_page()
pdf.set_font("helvetica", "B", 24)
pdf.set_text_color(32, 80, 150)
pdf.cell(0, 60, "Linux Commands Cheat Sheet", 
         new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")

pdf.set_font("helvetica", "I", 16)
pdf.set_text_color(255, 165, 0)
pdf.cell(0, 15, "Manglish + GenZ Edition", 
         new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")

pdf.set_font("helvetica", "", 12)
pdf.set_text_color(100, 100, 100)
pdf.multi_cell(0, 10, "\n\nCollection of 100 essential Linux commands\nwith Manglish explanations and emoji text!", align="C")

# Commands Pages
pdf.add_page()
for idx, (cmd, expl) in enumerate(commands, 1):
    pdf.chapter_title(idx, cmd)
    pdf.chapter_body(expl)
    if idx % 25 == 0 and idx != len(commands):
        pdf.add_page()

# Final Page
pdf.add_page()
pdf.set_font("helvetica", "B", 16)
pdf.set_text_color(32, 80, 150)
pdf.cell(0, 20, "That's All Folks! (Celebration)", 
         new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")

pdf.set_font("helvetica", "", 12)
pdf.set_text_color(50, 50, 50)
pdf.multi_cell(0, 8, "\n\nYou've reached the end of this Linux commands cheat sheet. Hope you found it useful!")

# Save PDF
pdf_path = "linux_commands_manglish_genz.pdf"
pdf.output(pdf_path)

print(f"PDF successfully generated at: {pdf_path}")