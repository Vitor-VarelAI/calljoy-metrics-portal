# 📞 CallScan

**AI-powered call analysis platform** for modern call centers.  
Transcribes, analyzes, and summarizes customer calls — with focus on regulatory compliance, critical language detection, and actionable agent feedback.

---

## 🚀 What is CallScan?

CallScan enables supervisors to:

- 🧠 Transcribe calls locally using Whisper
- 🤖 Analyze content using GPT (OpenAI)
- 📋 Check agent compliance against custom rules
- 😃 Track sentiment shifts during the call
- ❗ Detect critical words or phrases
- 🔊 Use a smart player to jump directly to alert moments
- 📄 Export HTML & PDF reports for audits or reviews

Built to be **privacy-first**, 100% hosted in the EU.

---

## 🧰 Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Backend      | Python + FastAPI          |
| Transcription| faster-whisper (local Whisper) |
| AI Analysis  | OpenAI GPT-3.5-turbo      |
| Storage      | Local SSD or Hetzner      |
| Reports      | HTML + PDF generator      |
| Frontend     | (Custom, decoupled — not in this repo)

---

## ⚙️ Core Features

- 📤 Upload audio (`.mp3`, `.wav`) and metadata (`.xlsx`)
- 📋 Configure per-call-center rules (script compliance)
- 🔊 Audio player with visual alert markers
- 😐 Sentiment classification (per call + over time)
- 💬 Natural language summaries
- 🧠 Agent improvement suggestions
- 📁 Report export (PDF/HTML)
- 🧾 Multi-agent & multi-call-center support

---

## 🧪 Running Locally

### Requirements

- Python 3.10+
- ffmpeg installed (for Whisper)
- OpenAI API key (set as env var)


🔐 Privacy & Compliance
✅ All processing and storage is done on EU servers (Hetzner)

❌ No audio or data is shared with third parties

✅ Only transcripts are sent to OpenAI

🛡️ Custom rules are scoped per call center (tenant-safe)

🔄 Roadmap (backend-focused)
 Upload endpoint

 Whisper transcription pipeline

 GPT-3.5 analysis with injected rules

 Rule management API

 HTML + PDF report generation

 Time-aligned alert export for audio player

 Agent-level metrics endpoint

 Call indexing & search

