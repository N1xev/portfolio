
export const aboutText = `A passionate and versatile Fullstack Developer with a knack for building robust and scalable applications. My expertise spans across modern web technologies, with a deep interest in the performance and efficiency of backend systems using Golang and the power of low-level programming with C/C++.

I thrive in fast-paced environments and am always eager to learn new technologies and tackle challenging problems. My goal is to create software that is not only functional but also elegant and efficient.`;

export const projects = [
  {
    title: 'Distributed Key-Value Store',
    description:
      'A high-performance, distributed key-value store built in Golang, implementing the Raft consensus algorithm for fault tolerance. Features consistent hashing for data distribution and gRPC for inter-node communication.',
    tech: ['Golang', 'gRPC', 'Protocol Buffers', 'Raft Consensus'],
  },
  {
    title: 'Real-time Collaborative Code Editor',
    description:
      'A web-based code editor that allows multiple users to edit the same file in real-time. Built with Next.js on the frontend and a Node.js server using WebSockets for synchronization.',
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'WebSockets'],
  },
  {
    title: 'C++ Game Engine Physics Module',
    description:
      'Developed a custom 2D physics engine module in C++. Implemented collision detection (AABB, Circle), resolution, and rigid body dynamics from scratch to optimize performance for a tile-based game.',
    tech: ['C++', 'Clang', 'CMake', 'SDL2'],
  },
  {
    title: 'C++ Game Engine Physics Module',
    description:
      'Developed a custom 2D physics engine module in C++. Implemented collision detection (AABB, Circle), resolution, and rigid body dynamics from scratch to optimize performance for a tile-based game.',
    tech: ['C++', 'Clang', 'CMake', 'SDL2'],
  },
  {
    title: 'C++ Game Engine Physics Module',
    description:
      'Developed a custom 2D physics engine module in C++. Implemented collision detection (AABB, Circle), resolution, and rigid body dynamics from scratch to optimize performance for a tile-based game.',
    tech: ['C++', 'Clang', 'CMake', 'SDL2'],
  },
];

export const skills = {
  'Web Development': [
    { name: 'React / Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js / Express', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Firebase', level: 80 },
  ],
  Golang: [
    { name: 'Concurrent Programming', level: 90 },
    { name: 'Microservices & APIs', level: 80 },
    { name: 'gRPC & Protobuf', level: 85 },
    { name: 'Standard Library', level: 95 },
  ],
  'C & C++ (Clang)': [
    { name: 'Systems Programming', level: 75 },
    { name: 'Performance Optimization', level: 80 },
    { name: 'Memory Management', level: 85 },
    { name: 'Build Systems (CMake)', level: 70 },
  ],
};

export const commands = [
    { cmd: 'about', desc: 'Display a short bio.' },
    { cmd: 'skills', desc: 'List my technical skills.' },
    { cmd: 'projects', desc: 'Showcase my recent projects.' },
    { cmd: 'clear', desc: 'Clear the terminal screen.' },
    { cmd: 'help', desc: 'Show this help message.' },
  ];

export const welcomeText = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 650 120">
  <text y="15" class="font-code" fill="currentColor">
    <tspan x="0" dy="1.2em">███████╗ █████╗ ███╗   ███╗ ██████╗ ██╗   ██╗██╗  ██╗   ██╗ ██████╗  ██████╗</tspan>
    <tspan x="0" dy="1.2em">██╔════╝██╔══██╗████╗ ████║██╔═══██╗██║   ██║██║  ╚██╗ ██╔╝██╔════╝ ██╔═══██╗</tspan>
    <tspan x="0" dy="1.2em">███████╗███████║██╔████╔██║██║   ██║██║   ██║██║   ╚████╔╝ ██║  ███╗██║   ██║</tspan>
    <tspan x="0" dy="1.2em">╚════██║██╔══██║██║╚██╔╝██║██║   ██║██║   ██║██║    ╚██╔╝  ██║   ██║██║   ██║</tspan>
    <tspan x="0" dy="1.2em">███████║██║  ██║██║ ╚═╝ ██║╚██████╔╝╚██████╔╝███████╗██║██╗╚██████╔╝╚██████╔╝</tspan>
    <tspan x="0" dy="1.2em">╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝╚═╝ ╚═════╝  ╚═════╝</tspan>
  </text>
  <text y="110" class="font-mono" fill="currentColor">Welcome, user. Type 'help' to see available commands.</text>
</svg>`;
