import React from 'react';

export function MockupPreview({ type }) {
  if (type === 'pg-mockup') {
    return (
      <div className="project-mockup pg-mockup w-full h-full p-4 bg-[#11110D] relative overflow-hidden flex flex-col select-none">
        {/* Mock Top Navigation & Role Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-white/70 font-['JetBrains_Mono'] text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--yellow)]" />
            <span className="font-semibold text-white">PG Admin Console</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] text-white/50">v2.4</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--status-green)] font-medium">● System Online</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px]">Admin Role</span>
          </div>
        </div>

        {/* Dashboard Grid Mockup */}
        <div className="grid grid-cols-[110px_1fr] gap-3 flex-1 min-h-0">
          {/* Sidebar */}
          <div className="flex flex-col gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/10 font-['JetBrains_Mono'] text-[9.5px] text-white/60">
            <div className="px-2 py-1 rounded bg-[var(--blue)]/30 text-white font-medium flex items-center justify-between">
              <span>Rooms</span>
              <span className="text-[8px] bg-white/20 px-1 rounded">12</span>
            </div>
            <div className="px-2 py-1 rounded hover:bg-white/5">Tenants</div>
            <div className="px-2 py-1 rounded hover:bg-white/5">Rent Dues</div>
            <div className="px-2 py-1 rounded hover:bg-white/5">Payments</div>
            <div className="mt-auto px-2 py-1 text-[8.5px] text-white/30 border-t border-white/10">MySQL Connected</div>
          </div>

          {/* Main Dashboard Area */}
          <div className="flex flex-col gap-2.5 min-w-0">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-md bg-white/[0.04] border border-white/10">
                <div className="text-[9px] font-['JetBrains_Mono'] text-white/40">Total Rooms</div>
                <div className="text-sm font-bold text-white font-['Space_Grotesk'] mt-0.5">24 / 28</div>
                <div className="text-[8px] text-[var(--status-green)] font-['JetBrains_Mono'] mt-0.5">85% Occupied</div>
              </div>
              <div className="p-2 rounded-md bg-white/[0.04] border border-white/10">
                <div className="text-[9px] font-['JetBrains_Mono'] text-white/40">Active Tenants</div>
                <div className="text-sm font-bold text-[var(--yellow)] font-['Space_Grotesk'] mt-0.5">38</div>
                <div className="text-[8px] text-white/40 font-['JetBrains_Mono'] mt-0.5">2 Pending</div>
              </div>
              <div className="p-2 rounded-md bg-white/[0.04] border border-white/10">
                <div className="text-[9px] font-['JetBrains_Mono'] text-white/40">Rent Collected</div>
                <div className="text-sm font-bold text-white font-['Space_Grotesk'] mt-0.5">₹1.84L</div>
                <div className="text-[8px] text-[var(--status-green)] font-['JetBrains_Mono'] mt-0.5">92% on time</div>
              </div>
            </div>

            {/* Room Status Table */}
            <div className="p-2.5 rounded-md bg-white/[0.03] border border-white/10 flex-1 flex flex-col justify-between font-['JetBrains_Mono'] text-[9.5px]">
              <div className="flex items-center justify-between text-white/40 pb-1.5 border-b border-white/10 text-[9px]">
                <span>Room #</span>
                <span>Tenant Name</span>
                <span>Rent Status</span>
                <span>Action</span>
              </div>
              <div className="flex items-center justify-between text-white/80 py-1 border-b border-white/[0.06]">
                <span className="font-semibold text-white">#102-A</span>
                <span>Rahul S.</span>
                <span className="text-[var(--status-green)] bg-[var(--status-green)]/15 px-1.5 py-0.5 rounded text-[8.5px]">Paid</span>
                <span className="text-white/40 hover:text-white cursor-pointer">View →</span>
              </div>
              <div className="flex items-center justify-between text-white/80 py-1 border-b border-white/[0.06]">
                <span className="font-semibold text-white">#104-B</span>
                <span>Priya M.</span>
                <span className="text-[var(--yellow)] bg-[var(--yellow)]/15 px-1.5 py-0.5 rounded text-[8.5px]">Due (2 days)</span>
                <span className="text-white/40 hover:text-white cursor-pointer">Remind →</span>
              </div>
              <div className="flex items-center justify-between text-white/80 py-1">
                <span className="font-semibold text-white">#201-A</span>
                <span>Karthik V.</span>
                <span className="text-[var(--status-green)] bg-[var(--status-green)]/15 px-1.5 py-0.5 rounded text-[8.5px]">Paid</span>
                <span className="text-white/40 hover:text-white cursor-pointer">View →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'market-mockup') {
    return (
      <div className="project-mockup market-mockup w-full h-full p-4 bg-[#11110D] relative overflow-hidden flex flex-col select-none">
        {/* Marketplace Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-white/70 font-['JetBrains_Mono'] text-[10px]">
          <div className="flex items-center gap-2">
            <span className="font-['Space_Grotesk'] font-bold text-white text-xs">PixelMart ✦</span>
            <span className="text-white/40">Digital Assets Store</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 rounded bg-white/10 text-white text-[9px] flex items-center gap-1">
              <span>🔍 Search UI kits...</span>
            </div>
            <span className="px-2 py-1 rounded bg-[var(--blue)] text-white text-[9px]">Cart (2)</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 pb-2.5 font-['JetBrains_Mono'] text-[9px]">
          <span className="px-2 py-0.5 rounded-full bg-[var(--yellow)] text-black font-semibold">All Assets</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60">UI Components</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60">Icon Packs</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60">Templates</span>
        </div>

        {/* Asset Cards Grid */}
        <div className="grid grid-cols-3 gap-2.5 flex-1 min-h-0">
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <div className="aspect-[4/2.5] rounded bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-white/60 font-['JetBrains_Mono'] text-[9px]">
              UI Kit v1
            </div>
            <div className="mt-1.5">
              <div className="text-[10px] font-semibold text-white font-['Space_Grotesk']">Design System Pro</div>
              <div className="flex items-center justify-between mt-1 text-[9px] font-['JetBrains_Mono']">
                <span className="text-[var(--yellow)] font-bold">$29</span>
                <span className="text-white/40">⭐ 4.9</span>
              </div>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <div className="aspect-[4/2.5] rounded bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-white/10 flex items-center justify-center text-white/60 font-['JetBrains_Mono'] text-[9px]">
              Icons 500+
            </div>
            <div className="mt-1.5">
              <div className="text-[10px] font-semibold text-white font-['Space_Grotesk'] font-medium">Minimal Icons Pack</div>
              <div className="flex items-center justify-between mt-1 text-[9px] font-['JetBrains_Mono']">
                <span className="text-[var(--yellow)] font-bold">$15</span>
                <span className="text-white/40">⭐ 5.0</span>
              </div>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <div className="aspect-[4/2.5] rounded bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center text-white/60 font-['JetBrains_Mono'] text-[9px]">
              React UI
            </div>
            <div className="mt-1.5">
              <div className="text-[10px] font-semibold text-white font-['Space_Grotesk']">Dashboard Theme</div>
              <div className="flex items-center justify-between mt-1 text-[9px] font-['JetBrains_Mono']">
                <span className="text-[var(--yellow)] font-bold">$34</span>
                <span className="text-white/40">⭐ 4.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-mockup student-mockup w-full h-full p-4 bg-[#11110D] relative overflow-hidden flex flex-col select-none">
      {/* Desktop App Window Title bar */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 text-white/70 font-['JetBrains_Mono'] text-[10px]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-green-400" />
          </div>
          <span className="font-semibold text-white ml-1">Student Records v1.0 (Tkinter)</span>
        </div>
        <span className="text-white/40 text-[9px]">Connected: MySQL localhost:3306</span>
      </div>

      {/* App Toolbar */}
      <div className="flex items-center justify-between gap-2 mb-3 bg-white/[0.04] p-1.5 rounded border border-white/10 font-['JetBrains_Mono'] text-[9px]">
        <div className="flex gap-1">
          <span className="px-2 py-1 rounded bg-[var(--blue)] text-white font-medium">+ Add Student</span>
          <span className="px-2 py-1 rounded bg-white/10 text-white/70">Edit</span>
          <span className="px-2 py-1 rounded bg-white/10 text-white/70">Delete</span>
        </div>
        <span className="text-white/40 px-2">Filter: All Departments</span>
      </div>

      {/* Data Table */}
      <div className="p-2.5 rounded bg-white/[0.03] border border-white/10 flex-1 flex flex-col font-['JetBrains_Mono'] text-[9.5px]">
        <div className="grid grid-cols-[60px_1fr_120px_60px] gap-2 text-white/40 pb-1.5 border-b border-white/10 text-[9px]">
          <span>ID</span>
          <span>Student Name</span>
          <span>Department</span>
          <span>CGPA</span>
        </div>
        <div className="grid grid-cols-[60px_1fr_120px_60px] gap-2 text-white/80 py-1.5 border-b border-white/[0.06]">
          <span className="text-white/50">STU-101</span>
          <span className="font-medium text-white">Ananya Sharma</span>
          <span className="text-white/60">Computer Science</span>
          <span className="text-[var(--status-green)] font-bold">8.92</span>
        </div>
        <div className="grid grid-cols-[60px_1fr_120px_60px] gap-2 text-white/80 py-1.5 border-b border-white/[0.06]">
          <span className="text-white/50">STU-102</span>
          <span className="font-medium text-white">Bala Murugan</span>
          <span className="text-white/60">Software Dev</span>
          <span className="text-[var(--status-green)] font-bold">8.45</span>
        </div>
        <div className="grid grid-cols-[60px_1fr_120px_60px] gap-2 text-white/80 py-1.5">
          <span className="text-white/50">STU-103</span>
          <span className="font-medium text-white">Divya Krishnan</span>
          <span className="text-white/60">Information Tech</span>
          <span className="text-[var(--status-green)] font-bold">7.80</span>
        </div>
      </div>
    </div>
  );
}
